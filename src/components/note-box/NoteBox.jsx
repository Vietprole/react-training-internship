import PropTypes from "prop-types";
import "./note-box.css";
import TrashIcon from "/assets/trash-icon.svg";
import SaveIcon from "/assets/save-icon.svg";
import { formatDate } from "../../utils/utils";
import { useState } from "react";

function NoteBox({
  variant = "primary",
  content = "This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍",
  createdAt = new Date(),
  onSaveChanges,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    onSaveChanges(currentContent);
  };

  return (
    <div className={`note-box ${variant}`}>
      <button
        className={`save-button ${isEditing ? "" : "hidden"}`}
        type="button"
        onMouseDown={handleSave}
        >
        {/* onMouseDown allow event of this button to fire before onBlur take effect */}
        <img src={SaveIcon} alt="Save icon" />
      </button>
      <textarea
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
  );
}

NoteBox.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  content: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  onSaveChanges: PropTypes.func,
};

export default NoteBox;
