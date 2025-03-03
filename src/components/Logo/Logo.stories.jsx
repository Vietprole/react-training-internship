import Logo from "./Logo";
import LogoSrc from "/assets/logo.svg";

export default {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const PlaceHolder = {
  args: {
    src: 'https://via.placeholder.com/48',
    variant: "medium",
    alt: 'Logo',
  },
};

export const Medium = {
  args: {
    src: LogoSrc,
    variant: "medium",
    alt: 'Logo',
  },
};

export const Large = {
  args: {
    src: LogoSrc,
    variant: "large",
    alt: 'Logo',
  },
};
