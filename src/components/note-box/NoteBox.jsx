import PropTypes from "prop-types";
import "./note-box.css";
import TrashIcon from "/assets/trash-icon.svg";
import { useState } from "react";

function NoteBox({
  variant = "primary",
  content = "This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍",
  createdAt = new Date(),
}) {
  const [isEditing, setIsEditing] = useState(false);
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const formatDate = (date) => {
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}, ${day} ${year}`;
  };

  return (
    <div className={`note-box ${variant}`}>
      <textarea
        className={`note`}
        rows={5}
        // contentEditable={true}
        onDoubleClick={handleDoubleClick}
        onBlur={handleBlur}
        disabled={!isEditing}
        value={content}
      />
      <div className="footer">
        <p className="note-date">{formatDate(createdAt)}</p>
        <img src={TrashIcon} alt="Delete icon" />
      </div>
    </div>
  );
}

NoteBox.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  content: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
};

export default NoteBox;
