import PropTypes from "prop-types";
import styles from "./NoteBox.module.css";
import TrashIcon from "/assets/trash-icon.svg";
import SaveIcon from "/assets/save-icon.svg";
import { formatDate } from "../../utils/date";
import { useState, useEffect, useRef } from "react";

function NoteBox({
  variant,
  title,
  createdAt,
  onSaveChanges,
  handleEmptyNote,
  onDeleteButtonClick,
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
        onSaveChanges(currentTitle);
      }
    } else setCurrentTitle(title); // If note is not newly created, reset title
  };

  const handleSave = () => {
    // No need to save if title is the same
    if (currentTitle === title) return;
    onSaveChanges(currentTitle);
  };

  return (
    <>
    <div className={`${styles.overlay} ${isEditing ? styles.visible : ''}`} />
    <div className={`${styles.noteBox} ${styles[variant]} ${isEditing ? styles.editing : ""}`}>
      <button
        className={`${styles.saveButton} ${isEditing ? "" : styles.hidden}`}
        type="button"
        onMouseDown={handleSave}
      >
        <img src={SaveIcon} alt="Save icon" />
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
        <button onClick={onDeleteButtonClick} type="button" className={styles.deleteModalOpenButton}>
          <img src={TrashIcon} alt="Delete icon" />
        </button>
      </div>
    </div>
    </>
  );
}

NoteBox.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  title: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  onSaveChanges: PropTypes.func,
  handleEmptyNote: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
};

export default NoteBox;
