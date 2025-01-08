import HoverIcon from "../../assets/hover-icon.svg";
import "./Sidebar-item.css";
import PropTypes from 'prop-types';

function SidebarItem({icon, alt}) {
  return (
    <button className="sidebar-item" type="button">
      <img src={HoverIcon} alt="Hover icon" className="hover-icon"/>
      <img src={icon} alt={alt} className="sidebar-item-icon"/>
    </button>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default SidebarItem;
