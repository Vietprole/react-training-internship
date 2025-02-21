import { Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./MainLayout.module.css";
import { getRandomVariant } from "../../utils/note";

function MainLayout() {
  const [newNote, setNewNote] = useState(null);
  function handleCreateNote() {
    setNewNote({
      userId: null,
      variant: getRandomVariant(),
      title: "",
      description: "",
      comments: [],
      createdAt: new Date(),
      isDone: false,
    });
  }

  return (
    <div className={styles.container}>
      <Sidebar handleCreateNote={handleCreateNote} />
      <Outlet context={newNote} />
    </div>
  );
}

export default MainLayout;
