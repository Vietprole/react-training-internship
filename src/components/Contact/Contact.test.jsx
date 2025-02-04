import { act } from "react";
import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import { vi } from "vitest";
import Contact from "./Contact";

vi.mock("../Map", () => ({
  default: function DummyMap(props) {
    return (
      <div data-testid="map">
        {props.center.lat}:{props.center.long}
      </div>
    );
  },
}));

test("should render contact information", () => {
  const center = { lat: 0, long: 0 };
  act(() => {
    render(
      <Contact
        name="Joni Baez"
        email="test@example.com"
        site="http://test.com"
        center={center}
      />
    );
  });

  expect(
    document.querySelector("[data-testid='email']").getAttribute("href")
  ).toEqual("mailto:test@example.com");

  expect(
    document.querySelector('[data-testid="site"]').getAttribute("href")
  ).toEqual("http://test.com");

  expect(document.querySelector('[data-testid="map"]').textContent).toEqual(
    "0:0"
  );
});
