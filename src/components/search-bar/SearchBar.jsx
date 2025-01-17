import SearchIcon from "/assets/search-icon.svg";
import PropTypes from "prop-types";
import "./search-bar.css";

function SearchBar({ setSearchPhrase }) {

  return (
    <div className="search-bar">
      <img src={SearchIcon} alt="Search icon" className="search-icon"/>
      <input type="text" className="search-input" placeholder="Search Notes" onChange={(e) => setSearchPhrase(e.target.value)}/>
    </div>
  );
}

SearchBar.propTypes = {
  setSearchPhrase: PropTypes.func.isRequired,
};

export default SearchBar;
