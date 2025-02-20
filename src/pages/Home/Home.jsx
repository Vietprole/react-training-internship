import styles from "./Home.module.css";
import NoteBox from "../../components/NoteBox/NoteBox";
import SearchBar from "../../components/SearchBar/SearchBar";
import DarkModeIcon from "/assets/dark-mode-icon.svg";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import NoteDetailModal from "../../components/NoteDetailModal/NoteDetailModal";
import { useState, useEffect } from "react";
import { calculateModalPosition } from "../../utils/dom";
// import { createPortal } from "react-dom";
import { createNote, getNotes, deleteNote } from "../../services/api/note";
import useAuth from "../../hooks/useAuth";
import { convertStringToDate } from "../../utils/date";
import { useOutletContext } from "react-router";
import NoteContainer from "../../components/NoteContainer/NoteContainer";

// function getNotes() {
//   const storedNotes = localStorage.getItem("notes");
//   if (!storedNotes) return [];

//   const parsedNotes = JSON.parse(storedNotes);
//   // Convert string back to Date object
//   return parsedNotes.map((note) => ({
//     ...note,
//     createdAt: new Date(note.createdAt),
//   }));
// }

function Home(){
  return(
    <div className={styles.container}>
      <div className={styles.header}>
        <SearchBar setSearchPhrase={setSearchPhrase} />
        <img
          src={DarkModeIcon}
          alt="Dark mode icon"
          className="dark-mode-icon"
        />
      </div>
      <h1 className={styles.title}>
        <span>Hello, </span>
        {user.email}
      </h1>
      <NoteContainer filteredNotes={filteredNotFes} />
    </div>
  )
}

export default Home;
