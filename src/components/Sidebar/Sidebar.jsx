import Logo from "../Logo/Logo";
import LogoSrc from "/assets/logo.svg";
import HomeIcon from "/assets/home-icon.svg";
import PlusIcon from "/assets/plus-icon.svg";
import LogoutIcon from "/assets/logout-icon.svg";
import styles from "./Sidebar.module.css";
import SidebarItem from "../SidebarItem/SidebarItem";
import DoneIcon from "/assets/done-icon.svg";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router';

function Sidebar({ handleCreateNote }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDone = location.pathname === "/done" ? true : false;

  const sidebarItems = [
    { icon: HomeIcon, alt: "Home icon", path: "/" },
    { icon: DoneIcon, alt: "Done icon", path: "/done" },
    { icon: PlusIcon, alt: "Plus icon", action: () => handleCreateNote(isDone) }
  ];

  // Get selected index based on current path
  const selectedIndex = sidebarItems.findIndex(item =>
    item.path === location.pathname
  );

  const handleItemClick = (index) => {
    const item = sidebarItems[index];
    if (item.action) {
      item.action();
    } else {
      navigate(item.path);
    }
  };

  return (
    <nav className={styles.sidebar}>
      <Logo src={LogoSrc} />
      <div className={styles.itemsContainer}>
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={item.alt}
            icon={item.icon}
            alt={item.alt}
            isSelected={index === selectedIndex}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
      <button
        className={styles.logoutButton}
        type="button"
        onClick={logout}
      >
        <img src={LogoutIcon} alt="Logout icon" />
      </button>
    </nav>
  );
}

Sidebar.propTypes = {
  handleCreateNote: PropTypes.func,
};

export default Sidebar;
