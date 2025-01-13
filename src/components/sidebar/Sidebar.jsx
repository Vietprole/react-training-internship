import Logo from "../logo/Logo";
import LogoSrc from "/assets/logo.svg";
import HomeIcon from "/assets/home-icon.svg";
import PlusIcon from "/assets/plus-icon.svg";
import LogoutIcon from "/assets/logout-icon.svg";
import "./sidebar.css";
import SidebarItem from "../sidebar-item/SidebarItem";
import { useState } from "react";

function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleItemClick = (index, isSelectable) => {
    if (isSelectable) {
      setSelectedIndex(index);
    }
  };

  const handleClickLogoutButton = () => {
    alert("Logout");
  }

  return (
    <nav className="sidebar">
      <Logo src={LogoSrc}/>
      <div className="sidebar-items-container">
        <SidebarItem
          icon={HomeIcon}
          alt="Home icon"
          isSelected={selectedIndex === 0}
          onClick={() => handleItemClick(0, true)}
        />
        <SidebarItem
          icon={PlusIcon}
          alt="Plus icon"
          isSelected={selectedIndex === 1}
          onClick={() => handleItemClick(1, false)}
        />
      </div>
      <button className="logout-button" type="button" onClick={handleClickLogoutButton}>
        <img src={LogoutIcon} alt="Logout icon" />
      </button>
    </nav>
  );
}

export default Sidebar;
