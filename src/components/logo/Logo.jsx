import PropTypes from "prop-types";
import "./logo.css";

const Logo = ({src, alt, brandName}) => {
  return (
    <div className="logo">
      <img className="logo-image" src={src} alt={alt} />
      <h1 className="logo-brand">{brandName}</h1>
    </div>
	);
};

Logo.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	brandName: PropTypes.string.isRequired
};

Logo.defaultProps = {
	src: "https://via.placeholder.com/80",
	alt: "Logo",
	brandName: "Brand Name"
};

export default Logo;