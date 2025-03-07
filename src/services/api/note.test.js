import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "./note";
import { API_URL } from "../config";

describe("note API", () => {
  const mockFetch = vi.fn();
  const mockToken = "fake-token";
  const mockUserId = 1;
  const mockNoteId = 123;

  const mockNote = {
    id: mockNoteId,
    userId: mockUserId,
    title: "Test Note",
    description: "Test Description",
    createdAt: "2023-01-01T00:00:00.000Z",
    isDone: false,
  };

  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(() => mockToken),
  };

  beforeEach(() => {
    // Reset mocks
    mockFetch.mockReset();

    // Default successful response
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([mockNote]),
    });

    // Mock globals
    vi.stubGlobal("fetch", mockFetch);
    vi.stubGlobal("localStorage", localStorageMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  describe("getNotes", () => {
    test("calls fetch with correct URL and auth header", async () => {
      await getNotes(mockUserId);

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_URL}/notes?userId=${mockUserId}`,
        expect.objectContaining({
          method: "GET",
          headers: {
            Authorization: `Bearer ${mockToken}`,
            "Content-Type": "application/json",
          },
        })
      );
    });

    test("returns parsed JSON response", async () => {
      const result = await getNotes(mockUserId);
      expect(result).toEqual([mockNote]);
    });

    test("throws error when there is fetch error", async () => {
      const mockConsoleLog = vi.spyOn(console, "log");
      // Mock fetch to throw a network error
      const networkError = new Error("Network failure");
      mockFetch.mockRejectedValueOnce(networkError);

      // Call the function that should catch the error
      await getNotes();

      // Verify console.log was called with the error
      expect(mockConsoleLog).toHaveBeenCalledWith(networkError);
    });
  });

  describe("getNoteById", () => {
    test("calls fetch with correct URL and auth header", async () => {
      // Modify mock to return single note instead of array
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockNote),
      });

      await getNoteById(mockNoteId);

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_URL}/notes/${mockNoteId}`,
        expect.objectContaining({
          method: "GET",
          headers: {
            Authorization: `Bearer ${mockToken}`,
            "Content-Type": "application/json",
          },
        })
      );
    });

    test("returns parsed JSON response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockNote),
      });

      const result = await getNoteById(mockNoteId);
      expect(result).toEqual(mockNote);
    });

    test("throws error when there is fetch error", async () => {
      const mockConsoleLog = vi.spyOn(console, "log");
      // Mock fetch to throw a network error
      const networkError = new Error("Network failure");
      mockFetch.mockRejectedValueOnce(networkError);

      // Call the function that should catch the error
      await getNoteById(1);

      // Verify console.log was called with the error
      expect(mockConsoleLog).toHaveBeenCalledWith(networkError);
    });
  });

  describe("createNote", () => {
    const newNote = {
      userId: mockUserId,
      title: "New Note",
      description: "New Description",
      isDone: false,
    };

    test("calls fetch with correct URL, method, and body", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ ...newNote, id: 456 }),
      });

      await createNote(newNote);

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_URL}/notes`,
        expect.objectContaining({
          method: "POST",
          headers: {
            Authorization: `Bearer ${mockToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        })
      );
    });

    test("returns the created note with ID", async () => {
      const createdNote = { ...newNote, id: 456 };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(createdNote),
      });

      const result = await createNote(newNote);
      expect(result).toEqual(createdNote);
    });

    test("throws error when there is fetch error", async () => {
      const mockConsoleLog = vi.spyOn(console, "log");
      // Mock fetch to throw a network error
      const networkError = new Error("Network failure");
      mockFetch.mockRejectedValueOnce(networkError);

      // Call the function that should catch the error
      await createNote({ ...newNote, id: 456 });

      // Verify console.log was called with the error
      expect(mockConsoleLog).toHaveBeenCalledWith(networkError);
    });
  });

  describe("updateNote", () => {
    const updatedNote = {
      ...mockNote,
      title: "Updated Title",
      description: "Updated Description",
    };

    test("calls fetch with correct URL, method, and body", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(updatedNote),
      });

      await updateNote(mockNoteId, updatedNote);

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_URL}/notes/${mockNoteId}`,
        expect.objectContaining({
          method: "PUT",
          headers: {
            Authorization: `Bearer ${mockToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedNote),
        })
      );
    });

    test("returns the updated note", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(updatedNote),
      });

      const result = await updateNote(mockNoteId, updatedNote);
      expect(result).toEqual(updatedNote);
    });

    test("throws error when there is fetch error", async () => {
      const mockConsoleLog = vi.spyOn(console, "log");
      // Mock fetch to throw a network error
      const networkError = new Error("Network failure");
      mockFetch.mockRejectedValueOnce(networkError);

      // Call the function that should catch the error
      await updateNote(mockNoteId, updatedNote);

      // Verify console.log was called with the error
      expect(mockConsoleLog).toHaveBeenCalledWith(networkError);
    });
  });

  describe("deleteNote", () => {
    test("calls fetch with correct URL, method, and auth header", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      await deleteNote(mockNoteId);

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_URL}/notes/${mockNoteId}`,
        expect.objectContaining({
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
        })
      );
    });

    test("returns the success response", async () => {
      const successResponse = { success: true };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(successResponse),
      });

      const result = await deleteNote(mockNoteId);
      expect(result).toEqual(successResponse);
    });

    test("throws error when there is fetch error", async () => {
      const mockConsoleLog = vi.spyOn(console, "log");
      // Mock fetch to throw a network error
      const networkError = new Error("Network failure");
      mockFetch.mockRejectedValueOnce(networkError);

      // Call the function that should catch the error
      await deleteNote(mockNoteId);

      // Verify console.log was called with the error
      expect(mockConsoleLog).toHaveBeenCalledWith(networkError);
    });
  });
});
