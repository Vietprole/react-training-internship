import { useRef } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../utils/date";
import styles from "./NewNote.module.css";
import { useOutletContext } from "react-router";

function NewNote({ variant, onCreate }) {
  const { setIsNewNoteDisplayed } = useOutletContext();
  const textAreaRef = useRef(null);
  const handleBlur = () => {
    const title = textAreaRef.current.value.trim();
    setIsNewNoteDisplayed(false);
    if (title !== "") {
      onCreate(title, variant);
    }
  };

  return (
    <>
      <div className={styles.overlay} />
      <div className={`${styles.newNote} ${styles[variant]}`}>
        <textarea
          ref={textAreaRef}
          className={styles.note}
          placeholder="Type your note..."
          onBlur={handleBlur}
          autoFocus={true}
        />
        <div className={styles.footer}>
          <p className={styles.noteDate}>{formatDate(new Date())}</p>
        </div>
      </div>
    </>
  );
}

NewNote.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  onCreate: PropTypes.func,
};

export default NewNote;
