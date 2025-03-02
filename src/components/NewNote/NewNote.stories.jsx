import AuthProvider from "../../contexts/AuthContext";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import NewNote from "./NewNote";

export default {
  title: "NewNote",
  component: NewNote,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <AuthProvider>
        <MainLayout>
          <Story />
        </MainLayout>
      </AuthProvider>
    ),
  ],
  tags: ["autodocs"],
};

export const Default = {
  args: {
    variant: "primary",
  },
};
