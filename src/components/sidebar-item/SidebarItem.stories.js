import SidebarItem from './SidebarItem';
import HomeIcon from "../../assets/home-icon.svg";
import PlusIcon from "../../assets/plus-icon.svg";

export default {
  title: 'SidebarItem',
  component: SidebarItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Create = {
  args: {
    icon: PlusIcon,
    alt: 'PlusIcon',
    hasSelectedState: false,
  },
};

export const Home = {
  args: {
    icon: HomeIcon,
    alt: 'HomeIcon',
    hasSelectedState: true,
  },
};
