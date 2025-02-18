import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, test, vi, beforeEach } from "vitest";
import AuthenticationForm from "./AuthenticationForm";
import AuthProvider from "../../contexts/AuthContext";
import authAPI from "../../services/api/auth";
import "@testing-library/jest-dom";

// Mock API
vi.mock("../../services/api/auth", () => ({
  default: {
    login: vi.fn(),
    signup: vi.fn(),
  },
}));

// Mock context provider and router for useNavigate
const renderForm = (isLoginMode = true) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <AuthenticationForm isLoginMode={isLoginMode} />
      </AuthProvider>
    </BrowserRouter>
  );
};

const fillForm = (email, password) => {
  fireEvent.change(screen.getByPlaceholderText(/Type your email/i), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText(/Type your password/i), {
    target: { value: password },
  });
};

const submitForm = (isLoginMode) => {
  const buttonText = isLoginMode ? /Sign in note.me/i : /Sign up/i;
  fireEvent.click(screen.getByRole("button", { name: buttonText }));
};

describe("AuthenticationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("API Integration", () => {
    // Use test.each to run the same test with different parameters
    test.each([
      ["login", true, authAPI.login],
      ["signup", false, authAPI.signup],
    ])(
      "calls %s API with correct data",
      async (mode, isLoginMode, apiMethod) => {
        // %s is replaced with string in the test array
        apiMethod.mockResolvedValueOnce({
          user: { id: 1, email: "test@example.com" },
          token: "fake-token",
        });

        renderForm(isLoginMode);
        fillForm("test@example.com", "Password123!");
        submitForm(isLoginMode);

        await waitFor(() => {
          expect(apiMethod).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "Password123!",
          });
        });
      }
    );
  });

  describe("Form Validation", () => {
    const validationCases = [
      {
        scenario: "empty email fields",
        input: { email: "", password: "test" },
        expectedErrorMessage: /email must not be empty/i,
      },
      {
        scenario: "empty password fields",
        input: { email: "test", password: "" },
        expectedErrorMessage: /password must be at least 8 characters long/i,
      },
      {
        scenario: "invalid email",
        input: { email: "test", password: "Password123!" },
        expectedErrorMessage: /Please enter a valid email address/i,
      },
      {
        scenario: "short password",
        input: { email: "test@example.com", password: "short" },
        expectedErrorMessage: /password must be at least 8 characters long/i,
      },
      // The current error message is "Password must contain at least 1 number, 1 special character, and 1 uppercase letter"
      // for all below cases, but I put the ".*" in the regex of the expectedErrorMessage so that
      // it can match the error message even if each case has a different error message in the future.
      {
        scenario: "password without number",
        input: { email: "test@example.com", password: "Password!" },
        expectedErrorMessage: /Password must contain at least 1 number/i,
      },
      {
        scenario: "password without special char",
        input: { email: "test@example.com", password: "Password123" },
        expectedErrorMessage:
          /Password must contain at least 1.*special character/i,
      },
      {
        scenario: "password without uppercase",
        input: { email: "test@example.com", password: "password@123" },
        expectedErrorMessage:
          /Password must contain at least 1.*uppercase letter/i,
      },
    ];

    test.each(validationCases)(
      "shows error message for $scenario",
      async ({ input, expectedErrorMessage }) => {
        renderForm(false);
        fillForm(input.email, input.password);
        submitForm(false);

        await waitFor(() => {
          expect(screen.getByText(expectedErrorMessage)).toBeInTheDocument();
        });
      }
    );
  });
});
