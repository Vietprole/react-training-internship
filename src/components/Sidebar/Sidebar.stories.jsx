import Sidebar from "./Sidebar";
import AuthProvider from "../../contexts/AuthContext";
import { BrowserRouter as Router } from "react-router";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
  },
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
