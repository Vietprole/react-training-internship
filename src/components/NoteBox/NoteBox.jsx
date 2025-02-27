import { useEffect, useRef } from "react";
import useNoteBoxState from "../../hooks/useNoteBoxState";
import PropTypes from "prop-types";
import { formatDate } from "../../utils/date";
import NoteDoneIcon from "/assets/note-done-icon.svg";
import NoteUndoneIcon from "/assets/note-undone-icon.svg";
import TrashIcon from "/assets/trash-icon.svg";
import styles from "./NoteBox.module.css";

//TODO Add newNote component
function NoteBox({
  variant,
  title,
  createdAt,
  isDone,
  handleEmptyNote,
  onDeleteButtonClick,
  onDoneButtonClick,
  handleNewNote,
  onClick,
}) {
  const {
    isEditing,
    currentTitle,
    setCurrentTitle,
    handleBlur,
    handleDeleteButtonClick,
    handleToggleDoneClick,
  } = useNoteBoxState(
    title,
    handleEmptyNote,
    onDeleteButtonClick,
    onDoneButtonClick,
    handleNewNote
  );
  const textareaRef = useRef(null);
  //TODO remove isEditing
  // useEffect(() => {
  //   // Set cursor to the beginning of textarea when note is empty (newly created)
  //   if (title === "" && textareaRef.current) {
  //     textareaRef.current.focus();
  //     textareaRef.current.selectionStart = 0;
  //     textareaRef.current.selectionEnd = 0;
  //   }
  // }, [title]);

  return (
    <div onClick={onClick}>
      <div className={`${styles.overlay} ${isEditing ? styles.visible : ""}`} />
      <div
        className={`${styles.noteBox} ${styles[variant]} ${
          isEditing ? styles.editing : ""
        }`}
        data-testid="note-box"
      >
        <button
          className={styles.doneButton}
          onClick={handleToggleDoneClick}
          type="button"
        >
          <img
            className={styles.doneIcon}
            src={isDone ? NoteDoneIcon : NoteUndoneIcon}
            alt="Mark done/undone icon"
          />
        </button>
        <textarea
          ref={textareaRef}
          className={styles.note}
          placeholder="Type your note..."
          onBlur={handleBlur}
          readOnly={!isEditing}
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          autoFocus={title === ""}
        />
        <div className={styles.footer}>
          <p className={styles.noteDate}>{formatDate(createdAt)}</p>
          <button
            id="note-box-delete-button"
            onClick={handleDeleteButtonClick}
            type="button"
            className={styles.deleteModalOpenButton}
          >
            <img src={TrashIcon} alt="Delete icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

NoteBox.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  title: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  isDone: PropTypes.bool,
  handleEmptyNote: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onDoneButtonClick: PropTypes.func,
  handleNewNote: PropTypes.func,
  onClick: PropTypes.func,
};

export default NoteBox;
