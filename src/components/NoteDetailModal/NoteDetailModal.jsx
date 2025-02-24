import PropTypes from "prop-types";
import styles from "./NoteDetailModal.module.css";
import EnterIcon from "/assets/enter-icon.svg";
import CloseIcon from "/assets/close-icon.svg";
import { getNoteById, updateNote } from "../../services/api/note";
import { useState, useEffect, useRef } from "react";
import { convertStringToDate, formatDate } from "../../utils/date";

function NoteDetailModal({
  noteId,
  onCloseButtonClick,
  onNoteTitleUpdate,
  onDeleteButtonClick,
}) {
  const { token } = useAuth();
  const [note, setNote] = useState();
  const [lastSavedDescription, setLastSavedDescription] = useState();
  const [lastSavedTitle, setLastSavedTitle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const commentInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const note = await getNoteById(noteId);
        setNote(note);
        setLastSavedDescription(note.description);
        setLastSavedTitle(note.title);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [noteId]);

  const onTitleBlur = async (event) => {
    const newTitle = event.target.value;
    // Prevent empty title from being saved
    // And revert to last saved title
    if (newTitle === "") {
      event.target.value = lastSavedTitle;
      return;
    }

    const editedNote = { ...note, title: newTitle };
    try {
      await updateNote(note.id, editedNote);
      onNoteTitleUpdate(note.id, editedNote.title);
    } catch (error) {
      console.error(error);
      event.target.value = note.title;
    } finally {
      setLastSavedTitle(newTitle);
    }
  };

  const handleDescriptionChange = (event) => {
    setNote((prev) => ({
      ...prev,
      description: event.target.value,
    }));
  };

  const handleSaveDescription = async () => {
    try {
      await updateNote(note.id, note);
      setLastSavedDescription(note.description);
    } catch (error) {
      console.error(error);
      // Revert to last saved state if update fails
      setNote((prev) => ({
        ...prev,
        description: lastSavedDescription,
      }));
    }
  };

  const handleCancelDescription = () => {
    setNote((prev) => ({
      ...prev,
      description: lastSavedDescription,
    }));
  };

  const handleAddComment = () => {
    try {
      const commentText = commentInputRef.current.value;
      if (!commentText.trim()) return; // Don't add empty comments

      const updatedNote = {
        ...note,
        comments: [...note.comments, commentText],
      };
      setNote(updatedNote);
      updateNote(note.id, updatedNote);

      // Clear input after adding
      commentInputRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading || !note) {
    return (
      <div className={styles.overlay}>
        <div className={styles.noteDetailModal} id="note-detail-modal">
          <div className={styles.loadingContainer}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.noteDetailModal} id="note-detail-modal">
        <button
          className={styles.closeButton}
          onClick={onCloseButtonClick}
          data-testid="close-button"
        >
          <img src={CloseIcon} alt="Close icon" />
        </button>
        <input
          className={styles.title}
          defaultValue={note.title}
          onBlur={onTitleBlur}
          data-testid="title-input"
        />
        <h3 className={styles.descriptionHeading}>Description</h3>
        <textarea
          className={styles.description}
          value={note.description}
          onChange={handleDescriptionChange}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.saveButton} onClick={handleSaveDescription}>
            Save
          </button>
          <button
            className={styles.cancelButton}
            onClick={handleCancelDescription}
          >
            Cancel
          </button>
        </div>
        <h3 className={styles.commentHeading}>Comment</h3>
        <div className={styles.commentInputContainer}>
          <input
            ref={commentInputRef}
            className={styles.commentInput}
            placeholder="Type your comment..."
            data-testid="comment-input"
          />
          <button className={styles.enterButton}>
            <img
              className={styles.enterIcon}
              src={EnterIcon}
              alt="Enter icon"
              onClick={handleAddComment}
              data-testid="add-comment-button"
            />
          </button>
        </div>
        <ul className={styles.commentList}>
          {note.comments?.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <footer className={styles.footer}>
          <p className={styles.noteDate}>
            {formatDate(convertStringToDate(note.createdAt))}
          </p>
          <button
            className={styles.deleteButton}
            onClick={onDeleteButtonClick}
          >
            Delete
          </button>
        </footer>
      </div>
    </div>
  );
}

NoteDetailModal.propTypes = {
  noteId: PropTypes.number,
  onCloseButtonClick: PropTypes.func,
  onNoteTitleUpdate: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
};

export default NoteDetailModal;
