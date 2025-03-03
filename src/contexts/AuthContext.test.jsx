import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useContext } from "react";
import { MemoryRouter } from "react-router";
import { vi, describe, beforeEach, test, expect } from "vitest";
import AuthProvider, { AuthContext } from "./AuthContext";
import authAPI from "../services/api/auth";
import {jwtDecode} from "jwt-decode";

// Mock the auth API and login function
vi.mock("../services/api/auth", () => ({
  default: {
    login: vi.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const originalModule = await import("react-router");
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Test component that will use the context
const TestComponent = () => {
  const { user, token, login, logout } = useContext(AuthContext);
  return (
    <div>
      <div data-testid="user">{user ? user.email : "no user"}</div>
      <div data-testid="token">{token || "no token"}</div>
      <button
        data-testid="login"
        onClick={() =>
          login({ email: "test@gmail.com", password: "password" })
        }
      >
        Login
      </button>
      <button data-testid="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

// Mock jwt-decode to avoid invalid token error
vi.mock("jwt-decode", () => ({
  jwtDecode: vi.fn()
}));

const renderWithProvider = () => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    </MemoryRouter>
  );
};

describe("AuthContext", () => {
  let user;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    user = userEvent.setup();

    // Mock a valid token expiration (far in the future)
    // This will make the token appear valid in all tests
    vi.mocked(jwtDecode).mockReturnValue({
      exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
    });
  });

  test("initializes with null user and empty token when localStorage is empty", () => {
    renderWithProvider();
    expect(screen.getByTestId("user").textContent).toBe("no user");
    expect(screen.getByTestId("token").textContent).toBe("no token");
  });

  test("initializes with user and token from localStorage", () => {
    const mockUser = { id: 1, email: "test@gmail.com" };
    const mockToken = "test-token";
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === "user") return JSON.stringify(mockUser);
      if (key === "token") return mockToken;
      return null;
    });

    renderWithProvider();
    expect(screen.getByText(/test@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/test-token/i)).toBeInTheDocument();
  });

  test("login successfully updates user, token and navigates to home", async () => {
    const mockUser = { id: 1, email: 'test@gmail.com' };
    const mockToken = "test-token";
    authAPI.login.mockResolvedValueOnce({
      user: mockUser,
      accessToken: mockToken,
    });

    renderWithProvider();
    await user.click(screen.getByTestId("login"));

    await waitFor(() => {
      expect(authAPI.login).toHaveBeenCalledWith({
        email: "test@gmail.com",
        password: "password",
      });

      expect(screen.getByText(/test@gmail.com/i)).toBeInTheDocument();
      expect(screen.getByText(/test-token/i)).toBeInTheDocument();

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify(mockUser)
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith("token", mockToken);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("login failure handles errors correctly", async () => {
    console.error = vi.fn();
    authAPI.login.mockRejectedValueOnce(new Error("Login failed"));
    localStorageMock.getItem.mockImplementation(() => null);

    renderWithProvider();
    await user.click(screen.getByTestId("login"));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
      expect(screen.getByText(/no user/i)).toBeInTheDocument();
      expect(screen.getByText(/no token/i)).toBeInTheDocument();
    });
  });

  test("logout clears user, token and navigates to login page", async () => {
    // Setup initial state with user and token
    const mockUser = { id: 1, email: 'test@gmail.com'};
    const mockToken = "test-token";
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === "user") return JSON.stringify(mockUser);
      if (key === "token") return mockToken;
      return null;
    });

    renderWithProvider();

    // Verify initial state
    expect(screen.getByText(/test@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/test-token/i)).toBeInTheDocument();

    // Perform logout
    await user.click(screen.getByTestId("logout"));

    // Verify logout effects
    expect(screen.getByText(/no user/i)).toBeInTheDocument();
    expect(screen.getByText(/no token/i)).toBeInTheDocument();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("user");
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("token");
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("automatically logs out when token is expired", async () => {
    // Mock jwt-decode to return an expired token
    vi.mocked(jwtDecode).mockReturnValue({
      exp: Math.floor(Date.now() / 1000) - 60 // Expired 1 minute ago
    });

    const mockUser = { id: 1, email: "test@gmail.com" };
    const mockToken = "expired-token";

    localStorageMock.getItem.mockImplementation((key) => {
      if (key === "user") return JSON.stringify(mockUser);
      if (key === "token") return mockToken;
      return null;
    });

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByText(/no user/i)).toBeInTheDocument();
      expect(screen.getByText(/no token/i)).toBeInTheDocument();
    });
  });
});
