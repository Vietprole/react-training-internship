import PropTypes from "prop-types";
import styles from "./NoteDetailModal.module.css";
import EnterIcon from "/assets/enter-icon.svg";
import CloseIcon from "/assets/close-icon.svg";

function NoteDetailModal({ note }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.noteDetailModal}>
        <button className={styles.closeButton}>
          <img src={CloseIcon} alt="close icon" />
        </button>
        <h2 className={styles.title}>{note.title}</h2>
        <h3 className={styles.descriptionHeading}>Description</h3>
        <textarea className={styles.description}>{note.description}</textarea>
        <div className={styles.buttonContainer}>
          <button className={styles.saveButton}>Save</button>
          <button className={styles.cancelButton}>Cancel</button>
        </div>
        <h3 className={styles.commentHeading}>Comment</h3>
        <div className={styles.commentInputContainer}>
          <input className={styles.commentInput} placeholder="Type your comment..."/>
          <button className={styles.enterButton}>
            <img className={styles.enterIcon} src={EnterIcon} alt="enter icon" />
          </button>
        </div>
        <ul className={styles.commentList}>
          {note.comments?.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
          <li>test 1</li>
          <li>test long word</li>
          <li>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
            quas ad maiores error, modi ex voluptatum odio iusto, blanditiis
            facilis quae ratione a deserunt nulla quaerat accusamus corrupti
            dolor sunt!
          </li>
          <li>test long word</li>
          <li>test long word</li>
          <li>test long word</li>
          <li>test long word</li>
          <li>test long word</li>
          <li>test long word</li>
          <li>test long word</li>
          <li>test long word</li>
          <li>test long word</li>
          <li>test long word</li>
          <li>test long word</li>
          <li>test long word</li>
          <li>test long word</li>
        </ul>
        <footer className={styles.footer}>
          {/* <p>{note.createdAt}</p> */}
          <p className={styles.noteDate}>Feb, 10 2025</p>
          <button className={styles.deleteButton}>Delete</button>
        </footer>
      </div>
    </div>
  );
}

NoteDetailModal.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
  }),
};

export default NoteDetailModal;
