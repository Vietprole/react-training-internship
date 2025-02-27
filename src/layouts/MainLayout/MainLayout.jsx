import { Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./MainLayout.module.css";

function MainLayout() {
  const [isNewNoteDisplayed, setIsNewNoteDisplayed] = useState(false);

  return (
    <div className={styles.container}>
      <Sidebar handleCreateNote={() => setIsNewNoteDisplayed(true)} />
      <Outlet context={{isNewNoteDisplayed, setIsNewNoteDisplayed}} />
    </div>
  );
}

export default MainLayout;
