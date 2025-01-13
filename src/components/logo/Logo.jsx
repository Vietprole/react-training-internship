import PropTypes from "prop-types";
import "./logo.css";

function Logo({src = "https://via.placeholder.com/48", alt = "Logo"}) {
  return (
    <img className="logo" src={src} alt={alt} />
	);
};

Logo.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
};

export default Logo;
