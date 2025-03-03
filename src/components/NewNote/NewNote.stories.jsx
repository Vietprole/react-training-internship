import { Outlet } from "react-router";
import NewNote from "./NewNote";
import { createContext } from "react";

function MainLayout() {
  const isNewNoteDisplayed = true;
  const setIsNewNoteDisplayed = () => {console.log("setIsNewNoteDisplayed")};

  return (
    <div>
      <Outlet context={{isNewNoteDisplayed, setIsNewNoteDisplayed}} />
    </div>
  );
}

const AuthContext = createContext();

function AuthProvider({ children }) {
  const contextValue = {
    token: 'token',
    user: '',
    login: () => {},
    logout: () => {},
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

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
