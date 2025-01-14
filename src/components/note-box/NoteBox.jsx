import PropTypes from "prop-types";
import "./note-box.css";
import TrashIcon from "/assets/trash-icon.svg";
import SaveIcon from "/assets/save-icon.svg";
import { formatDate } from "../../utils/utils";
import { useState, useEffect, useRef } from "react";

function NoteBox({
  variant,
  content,
  createdAt,
  onSaveChanges,
  handleEmptyNote,
}) {
  const [isEditing, setIsEditing] = useState(content === "" ? true : false);
  const [currentContent, setCurrentContent] = useState(content);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Set cursor to the beginning of textarea when note is empty (newly created)
    if (content === "" && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = 0;
      textareaRef.current.selectionEnd = 0;
    }
  }, [content]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);

    if (content === "") {
      if (currentContent === "") {
        // If note is newly created but user didn't type anything, discard note
        handleEmptyNote();
      } else {
        // If note is newly created and user typed something, save note
        onSaveChanges(currentContent);
      }
    } else setCurrentContent(content); // If note is not newly created, reset content
  };

  const handleSave = () => {
    // No need to save if content is the same
    if (currentContent === content) return;
    onSaveChanges(currentContent);
  };

  return (
    <>
    <div className={`overlay ${isEditing ? 'visible' : ''}`} />
    <div className={`note-box ${variant} ${isEditing ? "editing" : ""}`}>
      <button
        className={`save-button ${isEditing ? "" : "hidden"}`}
        type="button"
        onMouseDown={handleSave}
      >
        {/* onMouseDown allow event of this button to fire before onBlur take effect */}
        <img src={SaveIcon} alt="Save icon" />
      </button>
      <textarea
        ref={textareaRef}
        className="note"
        placeholder="Type your note..."
        onDoubleClick={handleDoubleClick}
        onBlur={handleBlur}
        readOnly={!isEditing}
        value={currentContent}
        onChange={(e) => setCurrentContent(e.target.value)}
      />
      <div className="footer">
        <p className="note-date">{formatDate(createdAt)}</p>
        <button>
          <img src={TrashIcon} alt="Delete icon" />
        </button>
      </div>
    </div>
    </>
  );
}

NoteBox.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  content: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  onSaveChanges: PropTypes.func,
  handleEmptyNote: PropTypes.func,
};

export default NoteBox;
