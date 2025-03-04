import { describe, test, vi, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Done from "./Done";

vi.mock("../../hooks/useNotes", () => ({
  default: () => ({
    filteredNotes: [],
    setNotes: vi.fn(),
    setSearchPhrase: vi.fn(),
  }),
}));

vi.mock("../../components/NoteContainer/NoteContainer", () => ({
  default: vi.fn(),
}));

describe("Done page", () => {
  test("renders 'Done' page", () => {
    render(<Done />);
    expect(screen.getByText("Done Notes!")).toBeInTheDocument();
  });
});
