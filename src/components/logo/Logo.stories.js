import Logo from './Logo';
import LogoSrc from "../../assets/logo.svg";

export default {
  title: 'Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const PlaceHolder = {
  args: {
    src: 'https://via.placeholder.com/48',
    alt: 'Logo',
  },
};

export const Custom = {
  args: {
    src: LogoSrc,
    alt: 'Logo',
  },
};
