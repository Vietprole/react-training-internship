import NewNote from "./NewNote";
import { MemoryRouter as Router, Routes, Route, Outlet } from "react-router";

const MockRoute = (Story) => (
  <Router>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/*" element={<Story />} />
      </Route>
    </Routes>
  </Router>
);

function MainLayout() {
  const setIsNewNoteDisplayed = () => {console.log("setIsNewNoteDisplayed")};

  return (
    <div>
      <Outlet context={{setIsNewNoteDisplayed}} />
    </div>
  );
}

export default {
  title: "NewNote",
  component: NewNote,
  parameters: {
    layout: "centered",
  },
  decorators: [MockRoute],
  tags: ["autodocs"],
};

export const Default = {
  args: {
    variant: "primary",
    onCreate: (title, variant) => console.log(`Creating a ${variant} note with title: ${title}`),
  },
};

