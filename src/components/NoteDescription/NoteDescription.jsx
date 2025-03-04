import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./NoteDescription.module.css";

const NoteDescription = ({ defaultDescription, onSaveDescription }) => {
  const [description, setDescription] = useState(defaultDescription);
  const handleSave = async () => {
    try {
      await onSaveDescription(description);
    }
    catch (error) {
      console.error(error);
      setDescription(defaultDescription);
    }
  };
  const handleCancel = () => {
    setDescription(defaultDescription);
  };

  return (
    <>
      <h3 className={styles.descriptionHeading}>Description</h3>
      <textarea
        className={styles.description}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
        <button className={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </>
  );
};

NoteDescription.propTypes = {
  defaultDescription: PropTypes.string,
  onSaveDescription: PropTypes.func,
};

export default NoteDescription;
