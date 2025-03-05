import { describe, test, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NoteContainer from "./NoteContainer";
import { useOutletContext } from "react-router";

// Mock dependencies
vi.mock("react-router", () => ({
  useOutletContext: vi.fn(() => ({
    isNewNoteDisplayed: false,
  })),
}));

vi.mock("../../hooks/useAuth", () => ({
  default: () => ({
    user: { id: 1 },
  }),
}));

vi.mock("../../services/api/note", () => ({
  createNote: vi.fn(() =>
    Promise.resolve({
      id: 1,
      userId: 1,
      title: "New Note",
      description: "",
      variant: "primary",
      comments: [],
      createdAt: "2025-02-27T12:00:00.000Z",
      isDone: false,
    })
  ),
  deleteNote: vi.fn(() => Promise.resolve()),
  updateNote: vi.fn(() => Promise.resolve()),
  getNoteById: vi.fn(() =>
    Promise.resolve({
      id: 1,
      userId: 1,
      title: "Test Note 1",
      description: "Test Description 1",
      variant: "primary",
      comments: [],
      createdAt: "2025-02-27T12:00:00.000Z",
      isDone: false,
    })
  ),
}));

// Import mocked functions to verify calls
import { createNote, deleteNote, updateNote } from "../../services/api/note";

// Setup portal container
beforeEach(() => {
  if (!document.getElementById("root")) {
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
  }

  vi.clearAllMocks();
});

describe("NoteContainer", () => {
  const mockNotes = [
    {
      id: 1,
      userId: 1,
      title: "Test Note 1",
      description: "Test Description 1",
      variant: "primary",
      comments: [],
      createdAt: new Date("2023-01-01"),
      isDone: false,
    },
    {
      id: 2,
      userId: 1,
      title: "Test Note 2",
      description: "Test Description 2",
      variant: "secondary",
      comments: [],
      createdAt: new Date("2023-01-02"),
      isDone: true,
    },
  ];

  const mockSetNotes = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    render(<NoteContainer filteredNotes={mockNotes} setNotes={mockSetNotes} />);
  });

  test("renders notes correctly", () => {
    expect(screen.getByText("Test Note 1")).toBeInTheDocument();
    expect(screen.getByText("Test Note 2")).toBeInTheDocument();
  });

  test("displays note detail modal when clicking a note", async () => {
    const firstNote = screen.getByText("Test Note 1");
    await user.click(firstNote);

    expect(screen.getByTestId("note-detail-modal")).toBeInTheDocument();
  });

  test("displays delete confirmation modal when delete button clicked", async () => {
    const deleteButtons = screen.getAllByTestId("delete-button");
    await user.click(deleteButtons[0]);

    expect(screen.getByTestId("delete-confirmation-modal")).toBeInTheDocument();
  });

  test("handles note deletion", async () => {
    // Open delete modal
    const deleteButtons = screen.getAllByTestId("delete-button");
    await user.click(deleteButtons[0]);

    // Confirm deletion in the portal
    const confirmButton = screen.getByTestId("delete-confirm-button");
    await user.click(confirmButton);

    expect(deleteNote).toHaveBeenCalledWith(mockNotes[0].id);
    expect(mockSetNotes).toHaveBeenCalled();
  });

  test("handles done status toggle", async () => {
    const doneButtons = screen.getAllByTestId("done-button");
    await user.click(doneButtons[0]);

    await waitFor(() => {
      expect(updateNote).toHaveBeenCalledWith(
        mockNotes[0].id,
        expect.objectContaining({ isDone: true })
      );
    });
    expect(mockSetNotes).toHaveBeenCalled();
  });

  test("renders NewNote component when isNewNoteDisplayed is true", async () => {
    // Clear previous render
    cleanup();

    useOutletContext.mockReturnValue({ isNewNoteDisplayed: true });

    // Re-render component with new context value
    render(<NoteContainer filteredNotes={mockNotes} setNotes={mockSetNotes} />);
    expect(screen.getByPlaceholderText(/Type your note/i)).toBeInTheDocument();
  });

  test("calls createNote when a new note is created", async () => {
    // Clear previous render
    cleanup();

    useOutletContext.mockReturnValue({
      isNewNoteDisplayed: true,
      setIsNewNoteDisplayed: vi.fn(),
    });

    // Re-render component with new context value
    render(<NoteContainer filteredNotes={mockNotes} setNotes={mockSetNotes} />);

    const textarea = screen.getByPlaceholderText(/Type your note/i);
    await user.type(textarea, "New Test Note");
    await user.tab();

    await waitFor(() => {
      expect(createNote).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "New Test Note",
          userId: 1,
        })
      );
    });
    expect(mockSetNotes).toHaveBeenCalled();
  });

  test("updates NoteBox title when note detail modal's title updated", async () => {
    const firstNote = screen.getByText("Test Note 1");
    await user.click(firstNote);

    const titleInput = screen.getByTestId("title-input");
    await user.clear(titleInput);
    await user.type(titleInput, "Updated Test Note");

    // Blur to save title
    await user.tab();

    expect(mockSetNotes).toHaveBeenCalled();

    // Get the function that was passed to mockSetNotes
    const updateFunction = mockSetNotes.mock.calls[0][0];

    // The function should be a state updater function
    expect(typeof updateFunction).toBe("function");

    // Test that the function updates the notes correctly
    const updatedNotes = updateFunction(mockNotes);

    // Verify the note with id 1 has the updated title
    const updatedNote = updatedNotes.find((note) => note.id === 1);
    expect(updatedNote.title).toBe("Updated Test Note");

    // Verify the other note remains unchanged
    const unchangedNote = updatedNotes.find((note) => note.id === 2);
    expect(unchangedNote.title).toBe("Test Note 2");
  });
});
