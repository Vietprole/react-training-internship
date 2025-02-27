import PropTypes from "prop-types";
import { formatDate } from "../../utils/date";
import NoteDoneIcon from "/assets/note-done-icon.svg";
import NoteUndoneIcon from "/assets/note-undone-icon.svg";
import TrashIcon from "/assets/trash-icon.svg";
import styles from "./NoteBox.module.css";

function NoteBox({
  variant,
  title,
  createdAt,
  isDone,
  onDeleteButtonClick,
  onDoneButtonClick,
  onClick,
}) {
  return (
    <div onClick={onClick}>
      <div
        className={`${styles.noteBox} ${styles[variant]}`}
        data-testid="note-box"
      >
        <button
          className={styles.doneButton}
          onClick={(e) => {
            e.stopPropagation();
            onDoneButtonClick();
          }}
          type="button"
        >
          <img
            className={styles.doneIcon}
            src={isDone ? NoteDoneIcon : NoteUndoneIcon}
            alt="Mark done/undone icon"
          />
        </button>
        <div className={styles.note}>{title}</div>
        <div className={styles.footer}>
          <p className={styles.noteDate}>{formatDate(createdAt)}</p>
          <button
            id="note-box-delete-button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteButtonClick();
            }}
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
  discardEmptyNote: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onDoneButtonClick: PropTypes.func,
  persistNote: PropTypes.func,
  onClick: PropTypes.func,
};

export default NoteBox;
