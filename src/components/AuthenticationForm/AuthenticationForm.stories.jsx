import { BrowserRouter } from "react-router";
import AuthenticationForm from "./AuthenticationForm";
import AuthProvider from "../../contexts/AuthContext";

export default {
  title: "Components/AuthenticationForm",
  component: AuthenticationForm,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AuthProvider>
          <Story />
        </AuthProvider>
      </BrowserRouter>
    ),
  ],
  tags: ["autodocs"],
};

export const LoginMode = {
  args: {
    isLoginMode: true,
  },
};

export const SignupMode = {
  args: {
    isLoginMode: false,
  },
};

