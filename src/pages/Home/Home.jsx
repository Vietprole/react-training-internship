import styles from "./Home.module.css";
import NoteBox from "../../components/NoteBox/NoteBox";
import SearchBar from "../../components/SearchBar/SearchBar";
import DarkModeIcon from "/assets/dark-mode-icon.svg";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import { useState, useEffect } from "react";
import { calculateModalPosition } from "../../utils/dom";
// import { createPortal } from "react-dom";
import { createNote, getNotes } from "../../services/api/note";
import useAuth from "../../hooks/useAuth";
import { convertStringToDate } from "../../utils/date";
import { useOutletContext } from "react-router";

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

function Home() {
  const newNote = useOutletContext();
  const { token, user } = useAuth();
  const [notes, setNotes] = useState();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);
  const filteredNotes =
    notes?.filter((note) => note.title.includes(searchPhrase)) || [];

  console.log("notes", notes);

  useEffect(() => {
    const fetchData = async () => {
      console.log("token, user", token, user.id);
      try {
        let notes = await getNotes(token, user.id);

        notes.forEach((note) => {
          note.createdAt = convertStringToDate(note.createdAt);
        });

        if (newNote) {
          notes = [...notes, newNote];
        }

        setNotes(notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        // If no note found for an user, json-server return error instead of empty array
        // so we need to set new note to allow create new note
        if (newNote) {
          setNotes([newNote]);
        }
      }
    };

    fetchData();

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
  }, [newNote, token, user.id]);

  // Sync notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleCreateNote = async (currentTitle) => {
    const noteToAdd = { ...newNote, userId: user.id, title: currentTitle };
    try {
      const createdNote = await createNote(token, noteToAdd);
      createdNote.createdAt = convertStringToDate(createdNote.createdAt);
      // setNotes((prevNotes) => [...prevNotes, createdNote]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
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
            title={note.title}
            createdAt={note.createdAt}
            variant={note.variant}
            // onSaveChanges={(content) => handleNoteChange(note.id, content)}
            handleEmptyNote={() => handleDeleteNote(note.id)}
            onDeleteButtonClick={() => showDeleteConfirmationModal(note.id)}
            handleNewNote={handleCreateNote}
          />
        ))}
      </div>
      {noteIdToDelete != null && (
        <DeleteConfirmationModal
          isDisplayed={noteIdToDelete !== null}
          position={modalPosition}
          onDeleteButtonClick={() => handleDeleteNote(noteIdToDelete)}
          onCancelButtonClick={() => setNoteIdToDelete(null)}
        />
      )}
    </div>
  );
}

export default Home;
