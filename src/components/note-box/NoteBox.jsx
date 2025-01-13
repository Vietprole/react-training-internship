import PropTypes from "prop-types";
import "./note-box.css";
import TrashIcon from "/assets/trash-icon.svg";
import { formatDate } from "../../utils/utils";

function NoteBox({
  variant = "primary",
  content = "This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍",
  createdAt = new Date(),
  onContentChange,
}) {

  const handleChange = (event) => {
    onContentChange(event.target.value);
  }

  return (
    <div className={`note-box ${variant}`}>
      <textarea className="note" placeholder="Type your note..." onChange={handleChange}>{content}</textarea>
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
  onContentChange: PropTypes.func,
};

export default NoteBox;
