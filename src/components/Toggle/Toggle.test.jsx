import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toggle from "./Toggle";

test("changes value when clicked", async () => {
  const onChange = vi.fn();
  const user = userEvent.setup();

  render(<Toggle onChange={onChange} />);
  const button = screen.getByTestId("toggle");

  expect(button.innerHTML).toBe("Turn on");

  await user.click(button);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(button.innerHTML).toBe("Turn off");

  // Click 5 more times
  for (let i = 0; i < 5; i++) {
    await user.click(button);
  }

  expect(onChange).toHaveBeenCalledTimes(6);
  expect(button.innerHTML).toBe("Turn on");
});
