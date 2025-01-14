import SearchIcon from "/assets/search-icon.svg";
import PropTypes from "prop-types";

function debounce(func, timeout = 3000){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function SearchBar({ onChange }) {
  return (
    <div>
      <img src={SearchIcon} alt="Search icon" />
      <input type="text" placeholder="Search Notes" onChange={(e) => onChange(e.target.value)}/>
    </div>
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
