import { describe, assert, test } from "vitest";
import DelayedDiv from "./DelayedDiv";
import { render, screen } from "@testing-library/react";

describe("DelayedDiv", () => {
  test("renders the Delayed Div with h1", async () => {
    render(<DelayedDiv />);
    const delayedDiv = await screen.findByText("Delayed Div");
    assert.exists(delayedDiv, 'Delayed Div should exist');
  });
});
