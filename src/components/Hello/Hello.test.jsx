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

test("should render a greeting", () => {
  const { container } = render(<Hello />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <span
        id="hello"
      >
        Hey, stranger
      </span>
    </div>
  `);
  cleanup();

  // render.container is returned, so we can destructure it, then rename it
  const { container: container2 } = render(<Hello name="Jenny" />);
  expect(container2).toMatchInlineSnapshot(`
    <div>
      <h1
        id="hello"
      >
        Hello, 
        Jenny
        !
      </h1>
    </div>
  `);
  cleanup();

  const { container: container3 } = render(<Hello name="Margaret" />);
  expect(container3).toMatchInlineSnapshot(`
    <div>
      <h1
        id="hello"
      >
        Hello, 
        Margaret
        !
      </h1>
    </div>
  `);
  cleanup();
});