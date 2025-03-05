import { describe, test, expect} from "vitest";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router";
import Signup from "./Signup";
import AuthProvider from "../../contexts/AuthContext";

describe("Signup page", () => {
  test("renders 'Signup' page", () => {
    render(
      <Router>
        <AuthProvider>
          <Signup />
        </AuthProvider>
      </Router>
    );

    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toBeInTheDocument();
  });
});
