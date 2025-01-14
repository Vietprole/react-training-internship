import SearchIcon from "/assets/search-icon.svg";
import PropTypes from "prop-types";
import "./search-bar.css";

function SearchBar({ onChange }) {

  return (
    <div className="search-bar">
      <img src={SearchIcon} alt="Search icon" className="search-icon"/>
      <input type="text" className="search-input" placeholder="Search Notes" onChange={(e) => onChange(e.target.value)}/>
    </div>
  );
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
