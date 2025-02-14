import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, test, vi, beforeEach } from "vitest";
import AuthenticationForm from "./AuthenticationForm";
import AuthProvider from "../../contexts/AuthContext";
import authAPI from "../../services/api/auth";

// Mock the authAPI
vi.mock("../../services/api/auth", () => ({
  default: {
    login: vi.fn(),
    signup: vi.fn(),
  },
}));

// Create AuthContext Provider wrapper for testing
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe("AuthenticationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe("Login mode", () => {
    test("calls login API with correct data", async () => {

      // Setup mock API response
      authAPI.login.mockResolvedValueOnce({
        user: { id: 1, email: "test@example.com" },
        token: "fake-token",
      });

      renderWithProviders(<AuthenticationForm isLoginMode={true} />);

      // Fill form and submit
      fireEvent.change(screen.getByPlaceholderText(/Type your email/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Type your password/i), {
        target: { value: "Password123!" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Sign in note.me/i }));

      // Verify API was called
      await waitFor(() => {
        expect(authAPI.login).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "Password123!",
        });
      });
    });
  });
});
