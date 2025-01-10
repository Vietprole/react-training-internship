import Logo from "../logo/Logo";
import LogoSrc from "/assets/logo.svg";
import HomeIcon from "/assets/home-icon.svg";
import PlusIcon from "/assets/plus-icon.svg";
import LogoutIcon from "/assets/logout-icon.svg";
import "./sidebar.css";
import SidebarItem from "../sidebar-item/SidebarItem";

function Sidebar() {
  return (
    <nav className="sidebar">
      <Logo src={LogoSrc}/>
      <div className="sidebar-items-container">
        <SidebarItem icon={HomeIcon} alt="Home icon" hasSelectedState={true}/>
        <SidebarItem icon={PlusIcon} alt="Plus icon" hasSelectedState={false}/>
      </div>
      <button className="logout-button" type="button">
        <img src={LogoutIcon} alt="Logout icon" />
      </button>
    </nav>
  );
}

export default Sidebar;
