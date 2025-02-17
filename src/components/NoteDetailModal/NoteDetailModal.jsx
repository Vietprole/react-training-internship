import PropTypes from "prop-types";
import styles from "./NoteDetailModal.module.css";

function NoteDetailModal({ note }) {
  return (
    <div className={styles.noteDetailModal}>
      <h2>{note.title}</h2>
      <h3>Description</h3>
      <textarea>{note.description}</textarea>
      <div>
        <button>Save</button>
        <button>Cancel</button>
      </div>
      <h3>Comment</h3>
      <input />
      <ul>
        {note.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
}

NoteDetailModal.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default NoteDetailModal;
