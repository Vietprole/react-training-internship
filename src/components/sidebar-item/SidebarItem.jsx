import HoverIcon from "/assets/hover-icon.svg";
import "./sidebar-item.css";
import PropTypes from "prop-types";

function SidebarItem({ icon, alt, isSelected, onClick }) {
  return (
    <button className="sidebar-item" type="button" onClick={onClick}>
      <img
        src={HoverIcon}
        alt="Hover icon"
        className={`${isSelected ? "visible" : "hidden"} hover-icon`}
      />
      <img src={icon} alt={alt} className="sidebar-item-icon" />
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
