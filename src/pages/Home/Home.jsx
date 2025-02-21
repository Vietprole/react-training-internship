import styles from "./Home.module.css";
import NoteBox from "../../components/NoteBox/NoteBox";
import SearchBar from "../../components/SearchBar/SearchBar";
import DarkModeIcon from "/assets/dark-mode-icon.svg";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import NoteDetailModal from "../../components/NoteDetailModal/NoteDetailModal";
import { useState, useEffect } from "react";
import { calculateModalPosition } from "../../utils/dom";
import { createNote, getNotes, deleteNote } from "../../services/api/note";
import useAuth from "../../hooks/useAuth";
import { convertStringToDate } from "../../utils/date";
import { useOutletContext } from "react-router";

function Home() {
  const newNote = useOutletContext();
  const { token, user } = useAuth();
  const [notes, setNotes] = useState();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);
  const [noteIdToShowDetail, setNoteIdToShowDetail] = useState(null);
  const filteredNotes =
    notes?.filter((note) => note.title.includes(searchPhrase)) || [];

  useEffect(() => {
    const fetchData = async () => {
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
      if (!event.target.closest("#delete-confirmation-modal")) {
        setNoteIdToDelete(null);
      }

      if (!event.target.closest("#note-detail-modal")) {
        setNoteIdToShowDetail(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup event listener to prevent memory leak
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newNote, token, user.id]);

  const handleCreateNote = async (currentTitle) => {
    const noteToAdd = { ...newNote, userId: user.id, title: currentTitle };
    try {
      const createdNote = await createNote(token, noteToAdd);
      createdNote.createdAt = convertStringToDate(createdNote.createdAt);
      setNotes((prevNotes) => {
        const newNotes = [...prevNotes];
        newNotes[newNotes.length - 1] = createdNote;
        return newNotes;
      });
    } catch (error) {
      console.error("Error creating note:", error);
      // Remove the last note if creation failed
      setNotes((prevNotes) => prevNotes.slice(0, -1));
    }
  };

  const handleNoteTitleUpdate = (id, newTitle) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, title: newTitle } : note
      )
    );
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(token, noteId);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    setNoteIdToDelete(null);
  };

  const showDeleteConfirmationModal = (id) => {
    setModalPosition(calculateModalPosition(event.clientX, event.clientY));
    setNoteIdToDelete(id);
  };

  const showNoteDetailModal = (id) => {
    setNoteIdToShowDetail(id);
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
        <span className={styles.name}>{user.email}</span>! 👋🏼
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
            handleEmptyNote={() => handleDeleteNote(note.id)}
            onDeleteButtonClick={() => showDeleteConfirmationModal(note.id)}
            onClick={() => showNoteDetailModal(note.id)}
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
      {noteIdToShowDetail != null && (
        <NoteDetailModal
          noteId={noteIdToShowDetail}
          onCloseButtonClick={() => setNoteIdToShowDetail(null)}
          onNoteTitleUpdate={handleNoteTitleUpdate}
        />
      )}
    </div>
  )
}

export default Home;
