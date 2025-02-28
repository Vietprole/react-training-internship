import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import authAPI from "./auth";
import { API_URL } from "../config";

describe("authAPI", () => {
  // Define mockFetch as a vi.fn() so we can use mockResolvedValueOnce
  const mockFetch = vi.fn();
  const userData = { email: "test@gmail.com", password: "password" };

  // Mock success response
  const mockSuccessResponse = {
    token: "fake-token",
    user: { id: 1, email: "test@gmail.com" },
  };

  beforeEach(() => {
    // Reset mockFetch to its default implementation
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockSuccessResponse),
    });

    // Use stubGlobal to mock fetch
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  test("login calls fetch with correct URL and method", async () => {
    const result = await authAPI.login(userData);
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/login`,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
    );

    expect(result).toEqual(mockSuccessResponse);
  });

  test("handle login error", async () => {
    const errorResponse = {
      ok: false,
      json: () => Promise.resolve({ error: "Invalid credentials" }),
    };
    mockFetch.mockResolvedValueOnce(errorResponse);

    const result = await authAPI.login(userData);

    expect(result).toEqual({error: "Invalid credentials"});
  });

  test("signup calls fetch with correct URL and method", async () => {
    const userData = { email: "test@gmail.com", password: "password" };
    const result = await authAPI.signup(userData);

    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/signup`,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
    );

    expect(result).toEqual(mockSuccessResponse);
  });

  test("handle signup error", async () => {
    const errorResponse = {
      ok: false,
      json: () => Promise.resolve({ error: "Invalid credentials" }),
    };
    mockFetch.mockResolvedValueOnce(errorResponse);

    const result = await authAPI.login(userData);

    expect(result).toEqual({error: "Invalid credentials"});
  });
});
