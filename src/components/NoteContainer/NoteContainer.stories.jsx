import { MemoryRouter as Router, Routes, Route, Outlet } from "react-router";
import NoteContainer from "./NoteContainer";
import { AuthContext } from "../../contexts/AuthContext";

// Mock AuthContext provider's values
const mockAuthValues = {
  token: "mock-token",
  user: {
    id: 1,
    email: "test@example.com",
  },
  login: () => {},
  logout: () => {},
};

const MockRoute = (Story) => {
  return (
    <AuthContext.Provider value={mockAuthValues}>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/*" element={<Story />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

function MainLayout() {
  const setIsNewNoteDisplayed = () => {console.log("setIsNewNoteDisplayed")};

  return (
    <div>
      <Outlet context={{setIsNewNoteDisplayed}} />
    </div>
  );
}

export default {
  title: "Components/NoteContainer",
  component: NoteContainer,
  decorators: [MockRoute],
  tags: ["autodocs"],
};

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

export const Loading = {
  args: {
    filteredNotes: null,
    setNotes: () => {},
  },
};
