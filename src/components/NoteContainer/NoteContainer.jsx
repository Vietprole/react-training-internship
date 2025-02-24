import styles from "./NoteContainer.module.css";
import NoteBox from "../../components/NoteBox/NoteBox";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import NoteDetailModal from "../../components/NoteDetailModal/NoteDetailModal";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { createNote, deleteNote, updateNote } from "../../services/api/note";
import useAuth from "../../hooks/useAuth";
import { convertStringToDate } from "../../utils/date";
import { useOutletContext } from "react-router";
import PropTypes from "prop-types";

function NoteContainer({ filteredNotes, setNotes }) {
  const { newNote, clearNewNote } = useOutletContext();
  const { user } = useAuth();
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);
  const [noteIdToShowDetail, setNoteIdToShowDetail] = useState(null);

  useEffect(() => {
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
  }, [newNote, user.id]);

  const handleCreateNote = async (currentTitle) => {
    const noteToAdd = { ...newNote, userId: user.id, title: currentTitle };
    try {
      const createdNote = await createNote(noteToAdd);
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
    } finally {
      clearNewNote();
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
    deleteNote(noteId);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    setNoteIdToDelete(null);
  };

  // Remove note from UI if note is empty and has not been committed to the database
  const handleEmptyNote = (noteId) => {
    clearNewNote();
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    setNoteIdToDelete(null);
  };

  const showDeleteConfirmationModal = (id) => {
    setNoteIdToDelete(id);
  };

  const showNoteDetailModal = (id) => {
    setNoteIdToShowDetail(id);
  };

  const handleToggleDone = async (id) => {
    const noteToUpdate = filteredNotes.find((note) => note.id === id);
    await updateNote(id, { ...noteToUpdate, isDone: !noteToUpdate.isDone });
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isDone: !note.isDone } : note
      )
    );
  };

  return (
    <>
      <div className={styles.notesContainer}>
        {filteredNotes.map((note) => (
          <NoteBox
            key={note.id ? note.id : 0} // Temporary key for new note
            title={note.title}
            createdAt={note.createdAt}
            variant={note.variant}
            isDone={note.isDone}
            handleEmptyNote={() => handleEmptyNote(note.id)}
            onDeleteButtonClick={() => showDeleteConfirmationModal(note.id)}
            onDoneButtonClick={() => handleToggleDone(note.id)}
            onClick={() => showNoteDetailModal(note.id)}
            handleNewNote={handleCreateNote}
          />
        ))}
      </div>
      {noteIdToDelete != null &&
        createPortal(
          <DeleteConfirmationModal
            onDeleteButtonClick={() => handleDeleteNote(noteIdToDelete)}
            onCancelButtonClick={() => setNoteIdToDelete(null)}
          />,
          document.getElementById("root")
        )}
      {noteIdToShowDetail != null &&
        createPortal(
          <NoteDetailModal
            noteId={noteIdToShowDetail}
            onCloseButtonClick={() => setNoteIdToShowDetail(null)}
            onNoteTitleUpdate={handleNoteTitleUpdate}
            onDeleteButtonClick={() =>
              showDeleteConfirmationModal(noteIdToShowDetail)
            }
          />,
          document.getElementById("root")
        )}
    </>
  );
}
NoteContainer.propTypes = {
  filteredNotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      variant: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      comments: PropTypes.arrayOf(PropTypes.string),
      createdAt: PropTypes.instanceOf(Date),
      isDone: PropTypes.bool,
    })
  ),
  setNotes: PropTypes.func,
};

export default NoteContainer;
