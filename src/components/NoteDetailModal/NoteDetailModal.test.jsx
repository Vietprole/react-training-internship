import { describe, test, expect, vi, beforeEach, afterEach, global } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  title: "Test Title",
  description: "Test Description",
  createdAt: "2024-02-24T10:00:00.000Z",
  variant: "primary",
  isDone: false,
  comments: [ "Test comment 1", "Test comment 2" ],
};

// Setup fetch mock
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockNote)
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

const renderWithProviders = (ui) => {
  return render(
    <AuthContext.Provider value={mockAuthValues}>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthContext.Provider>
  );
};

describe("NoteDetailModal", () => {
  const mockProps = {
    noteId: 1,
    onCloseButtonClick: vi.fn(),
    onNoteTitleUpdate: vi.fn(),
    onDeleteButtonClick: vi.fn(),
  };

  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test("renders modal with correct note details", () => {
    renderWithProviders(<NoteDetailModal {...mockProps} />);
    expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Test comment 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test comment 2/i)).toBeInTheDocument;
    expect(screen.getByText(/Feb, 24 2025/i)).toBeInTheDocument();
  });

  test("calls onCloseButtonClick when close button is clicked", async () => {
    renderWithProviders(<NoteDetailModal {...mockProps} />);

    const closeButton = screen.getByTestId("close-button");
    await user.click(closeButton);

    expect(mockProps.onCloseButtonClick).toHaveBeenCalledTimes(1);
  });

  test("calls onDeleteButtonClick when delete button is clicked", async () => {
    renderWithProviders(<NoteDetailModal {...mockProps} />);

    const deleteButton = screen.getByTestId("delete-button");
    await user.click(deleteButton);

    expect(mockProps.onDeleteButtonClick).toHaveBeenCalledTimes(1);
  });

  test("updates note title when title is changed", async () => {
    renderWithProviders(<NoteDetailModal {...mockProps} />);

    const titleInput = screen.getByTestId("title-input");
    await user.clear(titleInput);
    await user.type(titleInput, "New Title");
    fireEvent.blur(titleInput);

    expect(mockProps.onNoteTitleUpdate).toHaveBeenCalledWith(1, "New Title");
  });

  test("doesn't update title if new value is empty", async () => {
    renderWithProviders(<NoteDetailModal {...mockProps} />);

    const titleInput = screen.getByTestId("title-input");
    await user.clear(titleInput);
    fireEvent.blur(titleInput);

    expect(mockProps.onNoteTitleUpdate).not.toHaveBeenCalled();
  });
});
