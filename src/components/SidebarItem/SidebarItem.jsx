import HoverIcon from "/assets/hover-icon.svg";
import styles from "./SidebarItem.module.css";
import PropTypes from "prop-types";

function SidebarItem({ icon, alt, isSelected, onClick }) {
  return (
    <button className={styles.item} type="button" onClick={onClick}>
      <img
        src={HoverIcon}
        alt="Hover icon"
        className={`${isSelected ? styles.visible : styles.hidden} ${styles.hoverIcon}`}
      />
      <img src={icon} alt={alt} className={styles.icon} />
    </button>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SidebarItem;
