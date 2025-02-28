import useAuth from "./useAuth";
import { renderHook } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { BrowserRouter } from "react-router";
import AuthProvider from "../contexts/AuthContext";

describe("useAuth", () => {
  test("returns authentication context with expected properties", () => {
    // Render the hook with AuthProvider wrapper
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <BrowserRouter>
          <AuthProvider>{children}</AuthProvider>
        </BrowserRouter>
      ),
    });

    // Check that it returns the expected properties
    expect(result.current).toHaveProperty("user");
    expect(result.current).toHaveProperty("token");
    expect(result.current).toHaveProperty("login");
    expect(result.current).toHaveProperty("logout");
    expect(typeof result.current.login).toBe("function");
    expect(typeof result.current.logout).toBe("function");
  });
});
