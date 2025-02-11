import styles from "./Home.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import NoteBox from "../../components/NoteBox/NoteBox";
import SearchBar from "../../components/SearchBar/SearchBar";
import DarkModeIcon from "/assets/dark-mode-icon.svg";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { calculateModalPosition } from "../../utils/utils";
import { createPortal } from "react-dom";

const VARIANTS = ["primary", "secondary", "tertiary"];

function getRandomVariant(prevVariant) {
  const availableVariants = VARIANTS.filter(
    (variant) => variant !== prevVariant
  );
  const randomIndex = Math.floor(Math.random() * availableVariants.length);
  return availableVariants[randomIndex];
}

function getNotes() {
  const storedNotes = localStorage.getItem("notes");
  if (!storedNotes) return [];

  const parsedNotes = JSON.parse(storedNotes);
  // Convert string back to Date object
  return parsedNotes.map((note) => ({
    ...note,
    createdAt: new Date(note.createdAt),
  }));
}

function Home() {
  const [notes, setNotes] = useState(getNotes());
  const [searchPhrase, setSearchPhrase] = useState("");
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);
  const filteredNotes = notes.filter((note) =>
    note.content.includes(searchPhrase)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".delete-confirmation-modal")) {
        setNoteIdToDelete(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup event listener to prevent memory leak
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sync notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleCreateNote = () => {
    const prevNote = notes[notes.length - 1];
    const prevVariant = prevNote?.variant;

    const newNote = {
      id: uuidv4(),
      content: "",
      createdAt: new Date(),
      variant: getRandomVariant(prevVariant),
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleNoteChange = (id, newContent) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    setNoteIdToDelete(null);
  };

  const showDeleteConfirmationModal = (id) => {
    setModalPosition(calculateModalPosition(event.clientX, event.clientY));
    setNoteIdToDelete(id);
  };

  return (
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
        <span className={styles.name}>Ruy</span>! 👋🏼
      </h1>
      <p className={styles.description}>
        All your notes are here, in one place!
      </p>
      <div className={styles.notesContainer}>
        {filteredNotes.map((note) => (
          <NoteBox
            key={note.id}
            content={note.content}
            createdAt={note.createdAt}
            variant={note.variant}
            onSaveChanges={(content) => handleNoteChange(note.id, content)}
            handleEmptyNote={() => handleDeleteNote(note.id)}
            onDeleteButtonClick={() => showDeleteConfirmationModal(note.id)}
          />
        ))}
      </div>
      {noteIdToDelete != null &&
        createPortal(
          <DeleteConfirmationModal
            isDisplayed={noteIdToDelete !== null}
            position={modalPosition}
            onDeleteButtonClick={() => handleDeleteNote(noteIdToDelete)}
            onCancelButtonClick={() => setNoteIdToDelete(null)}
          />,
          document.body
        )}
    </div>
  );
}

export default Home;
