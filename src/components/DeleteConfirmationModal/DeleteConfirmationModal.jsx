import styles from "./DeleteConfirmationModal.module.css";
import CloseIcon from "/assets/close-icon.svg";
import PropTypes from "prop-types";

function DeleteConfirmationModal({ onDeleteButtonClick, onCancelButtonClick }) {
  return (
    <div>
      <div className={styles.overlay} onClick={onCancelButtonClick}/>
      <div
        className={styles.deleteConfirmationModal}
      >
        <button className={styles.closeButton} onClick={onCancelButtonClick}>
          <img src={CloseIcon} alt="Close icon" />
        </button>
        <h2>Confirm deletion</h2>
        <p>Are you sure you want to delete this note?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onCancelButtonClick}>
            Cancel
          </button>
          <button className={styles.deleteButton} onClick={onDeleteButtonClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

DeleteConfirmationModal.propTypes = {
  onDeleteButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
};

export default DeleteConfirmationModal;
