import Logo from "../logo/Logo";
import LogoSrc from "/assets/logo.svg";
import HomeIcon from "/assets/home-icon.svg";
import PlusIcon from "/assets/plus-icon.svg";
import LogoutIcon from "/assets/logout-icon.svg";
import styles from "./Sidebar.module.css";
import SidebarItem from "../sidebar-item/SidebarItem";
import { useState } from "react";
import PropTypes from "prop-types";

function Sidebar({ handleCreateNote }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleItemClick = (index, isSelectable) => {
    if (isSelectable) {
      setSelectedIndex(index);
    }
  };

  const handleLogout = () => {
    alert("Logout");
  }

  return (
    <nav className={styles.sidebar}>
      <Logo src={LogoSrc}/>
      <div className={styles.itemsContainer}>
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
          onClick={handleCreateNote}
        />
      </div>
      <button className={styles.logoutButton} type="button" onClick={handleLogout}>
        <img src={LogoutIcon} alt="Logout icon" />
      </button>
    </nav>
  );
}

Sidebar.propTypes = {
  handleCreateNote: PropTypes.func,
};

export default Sidebar;
