import { cleanup, render } from "@testing-library/react";
import { test, expect } from "vitest";
import Hello from "./Hello";

test("renders with or without a name", () => {
  let hello;
  render(<Hello />);
  hello = document.getElementById("hello");
  expect(hello.textContent).toBe("Hey, stranger");
  cleanup();

  render(<Hello name="Jenny" />);
  hello = document.getElementById("hello");
  expect(hello.textContent).toBe("Hello, Jenny!");
  cleanup();

  render(<Hello name="Margaret" />);
  hello = document.getElementById("hello");
  expect(hello.textContent).toBe("Hello, Margaret!");
  cleanup();
});