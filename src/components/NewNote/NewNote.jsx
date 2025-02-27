import { useRef } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../utils/date";
import styles from "./NewNote.module.css";

function NewNote({
  variant,
  discardEmptyNote,
  persistNote,
}) {
  const textAreaRef = useRef(null);
  const handleBlur = () => {
    const title = textAreaRef.current.value;
    if (title === "") {
      discardEmptyNote();
    } else {
      persistNote(title, variant);
    }
  };

  return (
    <>
      <div className={styles.overlay} />
      <div
        className={`${styles.newNote} ${styles[variant]}
        `}
      >
        <textarea
          ref={textAreaRef}
          className={styles.note}
          placeholder="Type your note..."
          onBlur={handleBlur}
          autoFocus={true}
        />
        <div className={styles.footer}>
          <p className={styles.noteDate}>{formatDate(Date.now)}</p>
        </div>
      </div>
    </>
  );
}

NewNote.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  discardEmptyNote: PropTypes.func,
  persistNote: PropTypes.func,
};

export default NewNote;
