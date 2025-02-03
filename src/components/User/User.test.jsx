import { vi } from "vitest";
import { test, act, render, expect } from "vitest";
import User from "./User";

test("renders user data", async () => {
  const fakeUser = {
    name: "Joni Baez",
    age: "32",
    address: "123, Charming Avenue"
  };
  vi.spyOn(User, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<User id="123" />, document);
  });

  expect(document.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(document.querySelector("strong").textContent).toBe(fakeUser.age);
  expect(document.textContent).toContain(fakeUser.address);

  // remove the mock to ensure tests are completely isolated
  User.fetch.mockRestore();
});