import {
  test,
  expect,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "./Card";

// There is a bug when use user-event with vitest fake timers, 
// so we need to stub jest.advanceTimersByTime to make user-event think this is jest
// https://github.com/testing-library/user-event/issues/1115
beforeAll(() => {
  // https://vitest.dev/api/vi.html#vi-stubglobal
  vi.stubGlobal("jest", {
    advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
  });
});

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

afterAll(() => {
  vi.unstubAllGlobals();
});

test("should select null after timing out", () => {
  const onSelect = vi.fn();
  render(<Card onSelect={onSelect} />);

  vi.advanceTimersByTime(100);
  expect(onSelect).not.toHaveBeenCalled();

  vi.advanceTimersByTime(5000);
  expect(onSelect).toHaveBeenCalledWith(null);
});

test("should cleanup on being removed", () => {
  const onSelect = vi.fn();
  const { unmount } = render(<Card onSelect={onSelect} />);

  vi.advanceTimersByTime(100);
  expect(onSelect).not.toHaveBeenCalled();

  unmount();
  vi.advanceTimersByTime(5000);
  expect(onSelect).not.toHaveBeenCalled();
});

test("should accept selections", async () => {
  const onSelect = vi.fn();
  const user = userEvent.setup({
    advanceTimers: (ms) => vi.advanceTimersByTime(ms),
  });

  render(<Card onSelect={onSelect} />);
  const element = screen.getByTestId("2");

  await user.click(element);
  vi.advanceTimersByTime(5000);
  expect(onSelect).toHaveBeenCalledWith(2);
});
