import PropTypes from "prop-types";
import styles from "./Logo.module.css";

function Logo({src = "https://via.placeholder.com/48", alt = "Logo"}) {
  return (
    <img className={styles.logo} src={src} alt={alt} />
  );
};

Logo.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
};

export default Logo;
