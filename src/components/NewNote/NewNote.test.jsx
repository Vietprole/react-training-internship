import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import NewNote from "./NewNote";
import { formatDate } from "../../utils/date";

const mockSetIsNewNoteDisplayed = vi.fn();
vi.mock("react-router", () => ({
  useOutletContext: () => ({
    setIsNewNoteDisplayed: mockSetIsNewNoteDisplayed,
  }),
}));

describe("NewNote", () => {
  const mockPersistNote = vi.fn();
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    render(<NewNote variant="primary" persistNote={mockPersistNote} />);
  });

  afterEach(() => vi.clearAllMocks());

  test("renders textarea with placeholder", () => {
    expect(
      screen.getByPlaceholderText("Type your note...")
    ).toBeInTheDocument();
  });

  test("displays current date", () => {
    const today = new Date();
    const formattedDate = formatDate(today);
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  test("calls persistNote when blur", async () => {
    const textarea = screen.getByPlaceholderText("Type your note...");
    await user.type(textarea, "New note content");
    await user.tab(); // Tab moves focus away
    expect(mockPersistNote).toHaveBeenCalledWith("New note content", "primary");
  });

  test("does not call persistNote when textarea is empty and then blur", async () => {
    expect(
      screen.getByPlaceholderText("Type your note...")
    ).toBeInTheDocument();
    await user.tab(); // Tab moves focus away
    expect(mockPersistNote).not.toHaveBeenCalled();
  });
});
