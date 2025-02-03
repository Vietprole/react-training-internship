import { createRoot } from "react-dom/client";
import { act } from "react";
import { beforeEach, afterEach, expect, test } from "vitest";
import App from "./App";
import { render } from "@testing-library/react";

let container = null;
let root = null;

// Setup and Teardown is not required
// since Teardown is automatically handled by vitest
// and Setup is handled by the render function in each test
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  // cleanup on exiting
  root.unmount();
  container.remove();
  container = null;
});

test("renders MyComponent", () => {
  window.alert = () => {};
  act(() => {
    render(<App />);
  });
  const textInput = document.getElementById('text-input');
  // check if textInput exists
  expect(textInput).not.toBeNull();
  expect(textInput.defaultValue).toBe('Init value');
});

