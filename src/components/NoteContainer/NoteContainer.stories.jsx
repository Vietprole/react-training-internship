import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import NoteContainer from "./NoteContainer";
import { AuthContext } from "../../contexts/AuthContext";

// Mock context values
const mockOutletValues = {
  newNote: null,
  clearNewNote: () => {},
};

// Mock auth values
const mockAuthValues = {
  token: "mock-token",
  user: {
    id: 1,
    email: "test@example.com"
  },
  login: () => {},
  logout: () => {},
};

// Wrapper with proper routing structure
const WithProviders = ({ children }) => {
  return (
    <AuthContext.Provider value={mockAuthValues}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Outlet context={mockOutletValues} />}>
            <Route index element={children} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

const meta = {
  title: "Components/NoteContainer",
  component: NoteContainer,
  decorators: [
    (Story) => (
      <WithProviders>
        <Story />
      </WithProviders>
    ),
  ],
  parameters: {
    // Disable routing in Storybook
    reactRouter: {
      routePath: '/',
    },
  },
  tags: ["autodocs"],
};

export default meta;

const mockNotes = [
  {
    id: 1,
    title: "Meeting Notes",
    variant: "primary",
    createdAt: new Date("2024-01-15"),
    isDone: false,
  },
  {
    id: 2,
    title: "Shopping List",
    variant: "secondary",
    createdAt: new Date("2024-01-16"),
    isDone: true,
  },
];

export const Default = {
  args: {
    filteredNotes: mockNotes,
    setNotes: () => {},
  },
};

export const Empty = {
  args: {
    filteredNotes: [],
    setNotes: () => {},
  },
};

export const SingleNote = {
  args: {
    filteredNotes: [mockNotes[0]],
    setNotes: () => {},
  },
};
