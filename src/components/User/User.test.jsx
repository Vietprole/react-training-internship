import { vi } from "vitest";
import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import { act } from "react";
import User from "./User";

window.fetch = vi.fn()

test("renders user data", async () => {
  const fakeUser = {
    name: "Joni Baez",
    age: "32",
    address: "123, Charming Avenue"
  };

  fetch.mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<User id="123" />);
  });

  expect(document.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(document.querySelector("strong").textContent).toBe(fakeUser.age);
  expect(document.body.textContent).toContain(fakeUser.address);

  // remove the mock to ensure tests are completely isolated
  fetch.mockRestore();
});