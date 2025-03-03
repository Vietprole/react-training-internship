import PropTypes from "prop-types";
import styles from "./NoteDetailModal.module.css";
import EnterIcon from "/assets/enter-icon.svg";
import CloseIcon from "/assets/close-icon.svg";
import { convertStringToDate, formatDate } from "../../utils/date";
import NoteDescription from "../NoteDescription/NoteDescription";
// import useNoteDetail from "../../hooks/useNoteDetail";
import useNoteDetail from "#src/hooks/useNoteDetail";

function NoteDetailModal({
  noteId,
  onCloseModal,
  onTitleUpdate,
  onDeleteButtonClick,
}) {
  const {
    note,
    isLoading,
    onTitleBlur,
    handleSaveDescription,
    handleAddComment,
    commentInputRef,
  } = useNoteDetail({ noteId, onTitleUpdate });

  if (isLoading || !note) {
    return (
      <div className={styles.overlay}>
        <div className={styles.noteDetailModal} data-testid="note-detail-modal">
          <div className={styles.loadingContainer}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.overlay} onClick={onCloseModal} />
      <div className={styles.noteDetailModal} data-testid="note-detail-modal">
        <button
          className={styles.closeButton}
          onClick={onCloseModal}
          data-testid="close-button"
        >
          <img src={CloseIcon} alt="Close icon" />
        </button>
        <input
          className={styles.title}
          defaultValue={note.title}
          onBlur={onTitleBlur}
          data-testid="title-input"
        />
        <NoteDescription
          defaultDescription={note.description}
          onSaveDescription={handleSaveDescription}
        />
        <h3 className={styles.commentHeading}>Comment</h3>
        <div className={styles.commentInputContainer}>
          <input
            ref={commentInputRef}
            className={styles.commentInput}
            placeholder="Type your comment..."
            data-testid="comment-input"
          />
          <button className={styles.enterButton}>
            <img
              className={styles.enterIcon}
              src={EnterIcon}
              alt="Enter icon"
              onClick={handleAddComment}
              data-testid="add-comment-button"
            />
          </button>
        </div>
        <ul className={styles.commentList}>
          {note.comments?.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <footer className={styles.footer}>
          <p className={styles.noteDate}>
            {formatDate(convertStringToDate(note.createdAt))}
          </p>
          <button className={styles.deleteButton} onClick={onDeleteButtonClick}>
            Delete
          </button>
        </footer>
      </div>
    </div>
  );
}

NoteDetailModal.propTypes = {
  noteId: PropTypes.number,
  onCloseModal: PropTypes.func,
  onTitleUpdate: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
};

export default NoteDetailModal;
