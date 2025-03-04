import MainLayout from "./MainLayout";
import AuthProvider from "../../contexts/AuthContext";
import { BrowserRouter as Router } from "react-router";

export default {
  title: "Components/MainLayout",
  component: MainLayout,
  decorators: [
    (Story) => (
      <Router>
        <AuthProvider>
          <Story />
        </AuthProvider>
      </Router>
    ),
  ],
  tags: ["autodocs"],
};

export const Default = {
  args: {},
};
