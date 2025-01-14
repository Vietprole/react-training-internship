import ArrowIcon from "/assets/arrow-icon.svg";
import "./delete-confirmation-modal.css";
import PropTypes from "prop-types";

function DeleteConfirmationModal({ isDisplayed, position }) {
  return (
    <div
      className={`delete-confirmation-modal ${isDisplayed ? "" : "hidden"}`}
      style={{ top: position.y, left: position.x, position: "absolute" }}
    >
      <div className="modal-content">
        <h2>Confirm deletion</h2>
        <p>Are you sure you want to delete this note?</p>
        <div className="button-container">
          <button className="cancel-button">Cancel</button>
          <button className="delete-button">Delete</button>
        </div>
      </div>
      <img src={ArrowIcon} alt="Arrow icon" className="arrow-icon" />
    </div>
  );
}

DeleteConfirmationModal.propTypes = {
  isDisplayed: PropTypes.bool.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

export default DeleteConfirmationModal;
