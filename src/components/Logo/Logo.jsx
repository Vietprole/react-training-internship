import PropTypes from "prop-types";
import styles from "./Logo.module.css";

function Logo({ src = "https://via.placeholder.com/48", variant = "medium" }) {
  return <img className={styles[variant]} src={src} alt="Logo" />;
}

Logo.propTypes = {
  src: PropTypes.string,
  variant: PropTypes.oneOf(["medium", "large"]),
};

export default Logo;
