import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import NoteBox from "./components/note-box/NoteBox";
import SearchBar from "./components/search-bar/SearchBar";
import DarkModeIcon from "/assets/dark-mode-icon.svg";
import DeleteConfirmationModal from "./components/delete-confirmation-modal/DeleteConfirmationModal";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

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

function App() {
  const [notes, setNotes] = useState(getNotes());
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isDeleteConfirmationModalDisplayed, setIsDeleteConfirmationModalDisplayed] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const filteredNotes = notes.filter((note) =>
    note.content.includes(searchPhrase)
  );

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

    setNotes([...notes, newNote]);
  };

  const handleNoteChange = (id, newContent) => {
    setNotes(notes.map((note) =>
      note.id === id ? { ...note, content: newContent } : note
    ))
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const showDeleteConfirmationModal = (id) => {
    setModalPosition({ x: event.clientX, y: event.clientY });
    setIsDeleteConfirmationModalDisplayed(true);
  }

  return (
    <div className="App">
      <Sidebar handleCreateNote={handleCreateNote} />
      <div className="main">
        <div className="header">
          <SearchBar setSearchPhrase={setSearchPhrase} />
          <img
            src={DarkModeIcon}
            alt="Dark mode icon"
            className="dark-mode-icon"
          />
        </div>
        <h1>
          <span>Hello, </span>
          <span className="name">Ruy</span>! 👋🏼
        </h1>
        <p className="description">All your notes are here, in one place!</p>
        <div className="notes-container">
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
      </div>
      <DeleteConfirmationModal isDisplayed={isDeleteConfirmationModalDisplayed} position={modalPosition}/>
    </div>
  );
}

export default App;
