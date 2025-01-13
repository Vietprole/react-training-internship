import PropTypes from "prop-types";
import "./note-box.css";
import TrashIcon from "/assets/trash-icon.svg";
import { formatDate } from "../../utils/utils";
// import { useState } from "react";

function NoteBox({
  variant = "primary",
  content = "This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍",
  createdAt = new Date(),
}) {
  // const [isEditing, setIsEditing] = useState(false);
  // const handleDoubleClick = () => {
  //   setIsEditing(true);
  // };

  // const handleBlur = () => {
  //   setIsEditing(false);
  // };

  return (
    <div className={`note-box ${variant}`}>
      <p className="note">{content}</p>
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
