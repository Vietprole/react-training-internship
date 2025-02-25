import styles from "./DeleteConfirmationModal.module.css";
import CloseIcon from "/assets/close-icon.svg";
import PropTypes from "prop-types";

function DeleteConfirmationModal({ onDeleteButtonClick, onCancelButtonClick }) {
  return (
    <div className={styles.overlay}>
      <div
        id="delete-confirmation-modal"
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
  isDisplayed: PropTypes.bool.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onDeleteButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;
