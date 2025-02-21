import PropTypes from "prop-types";
import styles from "./NoteBox.module.css";
import TrashIcon from "/assets/trash-icon.svg";
import { formatDate } from "../../utils/date";
import { useState, useEffect, useRef } from "react";
import NoteDoneIcon from "/assets/note-done-icon.svg";
import NoteUndoneIcon from "/assets/note-undone-icon.svg";

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
  const [isEditing, setIsEditing] = useState(title === "" ? true : false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Set cursor to the beginning of textarea when note is empty (newly created)
    if (title === "" && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = 0;
      textareaRef.current.selectionEnd = 0;
    }

    setCurrentTitle(title);
  }, [title]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);

    if (title === "") {
      if (currentTitle === "") {
        // If note is newly created but user didn't type anything, discard note
        handleEmptyNote();
      } else {
        // If note is newly created and user typed something, save note
        // onSaveChanges(currentTitle);
        handleNewNote(currentTitle);
      }
    } else setCurrentTitle(title); // If note is not newly created, reset title
  };

  const handleDeleteButtonClick = (e) => {
    e.stopPropagation(); // Stop event from bubbling up to parent
    onDeleteButtonClick();
  };

  const handleToggleDoneClick = (e) => {
    e.stopPropagation(); // Stop event from bubbling up to parent
    onDoneButtonClick();
  }

  return (
    <div onClick={onClick}>
      <div className={`${styles.overlay} ${isEditing ? styles.visible : ""}`} />
      <div
        className={`${styles.noteBox} ${styles[variant]} ${
          isEditing ? styles.editing : ""
        }`}
      >
        <button className={styles.doneButton} onClick={handleToggleDoneClick} type="button">
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
          onDoubleClick={handleDoubleClick}
          onBlur={handleBlur}
          readOnly={!isEditing}
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
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
