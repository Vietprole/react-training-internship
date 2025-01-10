import HoverIcon from "/assets/hover-icon.svg";
import "./SidebarItem.css";
import PropTypes from 'prop-types';
import { useState } from "react";

function SidebarItem({icon, alt, hasSelectedState}) {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    if (hasSelectedState){
      setIsSelected(!isSelected);
    }
  }

  return (
    <button className="sidebar-item" type="button" onClick={handleClick}>
      <img src={HoverIcon} alt="Hover icon" className={`${isSelected ? 'visible' : 'hidden'} hover-icon`}/>
      <img src={icon} alt={alt} className="sidebar-item-icon"/>
    </button>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  hasSelectedState: PropTypes.bool,
};

export default SidebarItem;
