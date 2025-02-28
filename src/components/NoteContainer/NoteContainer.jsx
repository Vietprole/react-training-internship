import styles from "./NoteContainer.module.css";
import NoteBox from "../../components/NoteBox/NoteBox";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import NoteDetailModal from "../../components/NoteDetailModal/NoteDetailModal";
import { useState } from "react";
import { createPortal } from "react-dom";
import { createNote, deleteNote, updateNote } from "../../services/api/note";
import useAuth from "../../hooks/useAuth";
import { convertStringToDate } from "../../utils/date";
import PropTypes from "prop-types";
import NewNote from "../NewNote/NewNote";
import { getRandomNonRepeatVariant } from "../../utils/note";
import { useOutletContext } from "react-router";

function NoteContainer({ filteredNotes, setNotes }) {
  const { user } = useAuth();
  const { isNewNoteDisplayed } = useOutletContext();
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);
  const [noteIdToShowDetail, setNoteIdToShowDetail] = useState(null);

  const handleCreateNote = async (title, variant) => {
    // Add userId and title of note to be created
    const noteToAdd = {
      userId: user.id,
      title,
      variant,
      description: "",
      comments: [],
      createdAt: Date.now(),
      isDone: false,
    };
    try {
      const createdNote = await createNote(noteToAdd);
      createdNote.createdAt = convertStringToDate(createdNote.createdAt);
      setNotes((prevNotes) => [...prevNotes, createdNote]);
    } catch (error) {
      console.error("Error creating note:", error);
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
  const discardEmptyNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    setNoteIdToDelete(null);
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

  // Get a random variant that is different from the previous note
  const getNewNoteVariant = () => {
    const prevVariant =
      filteredNotes.length > 0
        ? filteredNotes[filteredNotes.length - 1].variant
        : "primary";
    const newNoteVariant = getRandomNonRepeatVariant(prevVariant);
    return newNoteVariant;
  };

  return (
    <>
      <div className={styles.notesContainer}>
        {filteredNotes.map((note) => (
          <NoteBox
            key={note.id}
            title={note.title}
            createdAt={note.createdAt}
            variant={note.variant}
            isDone={note.isDone}
            onDeleteButtonClick={() => setNoteIdToDelete(note.id)}
            onDoneButtonClick={() => handleToggleDone(note.id)}
            onClick={() => setNoteIdToShowDetail(note.id)}
          />
        ))}
        {isNewNoteDisplayed && (
          <NewNote
            variant={getNewNoteVariant()}
            discardEmptyNote={discardEmptyNote}
            persistNote={handleCreateNote}
          />
        )}
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
            onDeleteButtonClick={() => setNoteIdToDelete(noteIdToShowDetail)}
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
