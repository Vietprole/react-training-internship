import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NoteDetailModal from "./NoteDetailModal";
import { BrowserRouter } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

// Mock auth context
const mockAuthValues = {
  token: "mock-token",
  user: { id: 1 },
};

// Mock note data
const mockNote = {
  id: 1,
  userId: 1,
  title: "Test Title",
  description: "Test Description",
  createdAt: "2024-02-24T10:00:00.000Z",
  variant: "primary",
  isDone: false,
  comments: ["Test comment 1", "Test comment 2"],
};

// Mock the API import
vi.mock("../../services/api/note", () => ({
  getNoteById: vi.fn(() => Promise.resolve(mockNote)),
  updateNote: vi.fn(() => Promise.resolve(mockNote)),
}));

// Now the import is mocked, we need to import it
import { updateNote } from "../../services/api/note";

// Setup fetch mock
const mockFetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockNote),
  })
);

beforeEach(() => {
  // Use stubGlobal to mock fetch
  vi.stubGlobal("fetch", mockFetch);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

const renderWithProviders = (component) => {
  return render(
    <AuthContext.Provider value={mockAuthValues}>
      <BrowserRouter>{component}</BrowserRouter>
    </AuthContext.Provider>
  );
};

describe("NoteDetailModal", () => {
  const mockProps = {
    noteId: 1,
    onCloseModal: vi.fn(),
    onTitleUpdate: vi.fn(),
    onDeleteButtonClick: vi.fn(),
  };

  let user;

  beforeEach(async () => {
    user = userEvent.setup();
    await act(async () => {
      renderWithProviders(<NoteDetailModal {...mockProps} />);
    });
  });

  test("renders modal with correct note details", () => {
    expect(screen.getByDisplayValue(/Test Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Test comment 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test comment 2/i)).toBeInTheDocument;
    expect(screen.getByText(/Feb, 24 2024/i)).toBeInTheDocument();
  });

  test("calls onCloseModal when close button is clicked", async () => {
    const closeButton = screen.getByTestId("close-button");
    await user.click(closeButton);
    expect(mockProps.onCloseModal).toHaveBeenCalledTimes(1);
  });

  test("update title when title is blurred", async () => {
    const titleInput = screen.getByTestId("title-input");
    await user.clear(titleInput);
    await user.type(titleInput, "New Title");
    fireEvent.blur(titleInput);

    await waitFor(() => {
      expect(updateNote).toHaveBeenCalledWith(mockNote.id, {
        ...mockNote,
        title: "New Title",
      });
      expect(mockProps.onTitleUpdate).toHaveBeenCalledWith(
        mockNote.id,
        "New Title"
      );
    });
  });

  test("doesn't update title if new value is empty", async () => {
    const titleInput = screen.getByTestId("title-input");
    await user.clear(titleInput);
    fireEvent.blur(titleInput);
    expect(mockProps.onTitleUpdate).not.toHaveBeenCalled();
  });

  test("update description when save button is clicked", async () => {
    const descriptionInput = screen.getByText(/Test Description/i);
    await user.clear(descriptionInput);
    await user.type(descriptionInput, "New Description");
    const saveButton = screen.getByText(/Save/i);
    await user.click(saveButton);

    await waitFor(() => {
      expect(updateNote).toHaveBeenCalledWith(mockNote.id, {
        ...mockNote,
        description: "New Description",
      });
    });
  });

  test("reverts to last saved description when cancel button is clicked", async () => {
    const descriptionInput = screen.getByText(/Test Description/i);
    await user.clear(descriptionInput);
    await user.type(descriptionInput, "New Description");
    const cancelButton = screen.getByText(/Cancel/i);
    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    });
  });

  test("update comments and clear input when add button is clicked", async () => {
    const commentInput = screen.getByTestId("comment-input");
    await user.type(commentInput, "New Comment");
    const addButton = screen.getByTestId("add-comment-button");
    await user.click(addButton);

    await waitFor(() => {
      expect(updateNote).toHaveBeenCalledWith(mockNote.id, {
        ...mockNote,
        comments: [...mockNote.comments, "New Comment"],
      });

      expect(screen.getByText(/New Comment/i)).toBeInTheDocument();
      expect(commentInput).toHaveValue("");
    });
  });

  test("calls onDeleteButtonClick when delete button is clicked", async () => {
    const deleteButton = screen.getByText(/Delete/i);
    await user.click(deleteButton);
    expect(mockProps.onDeleteButtonClick).toHaveBeenCalledTimes(1);
  });
});
