import { createRoot } from "react-dom/client";
import { act } from "react";
import { beforeEach, afterEach, test } from "vitest";
import App from "./App";

let container = null;
let root = null;
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
  act(() => {
    root.render(<App />);
  });
  expect
});
