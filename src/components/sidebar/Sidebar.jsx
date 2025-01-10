import Logo from "../logo/Logo";
import LogoSrc from "../../assets/logo.svg";
import HomeIcon from "../../assets/home-icon.svg";
import PlusIcon from "../../assets/plus-icon.svg";
import LogoutIcon from "../../assets/logout-icon.svg";
import "./Sidebar.css";
import SidebarItem from "../sidebar-item/Sidebar-item";

function Sidebar() {
  return (
    <div className="sidebar">
      <Logo src={LogoSrc}/>
      <div className="sidebar-items-container">
        <SidebarItem icon={HomeIcon} alt="Home icon" hasSelectedState={true}/>
        <SidebarItem icon={PlusIcon} alt="Plus icon" hasSelectedState={false}/>
      </div>
      <button className="logout-button" type="button">
        <img src={LogoutIcon} alt="Logout icon" />
      </button>
    </div>
  );
}

export default Sidebar;
