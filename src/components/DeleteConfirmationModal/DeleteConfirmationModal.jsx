import ArrowIcon from "/assets/arrow-icon.svg";
import styles from "./DeleteConfirmationModal.module.css";
import PropTypes from "prop-types";

function DeleteConfirmationModal({ isDisplayed, position, onDeleteButtonClick, onCancelButtonClick }) {
  return (
    <div
      className={`${styles.deleteConfirmationModal} ${isDisplayed ? "" : styles.hidden}`}
      style={{ top: position.y, left: position.x, position: "absolute" }}
    >
      <div className={styles.modalContent}>
        <h2>Confirm deletion</h2>
        <p>Are you sure you want to delete this note?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onCancelButtonClick}>Cancel</button>
          <button className={styles.deleteButton} onClick={onDeleteButtonClick}>Delete</button>
        </div>
      </div>
      <img src={ArrowIcon} alt="Arrow icon" className={styles.arrowIcon} />
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
