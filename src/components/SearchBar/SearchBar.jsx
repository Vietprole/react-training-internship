import SearchIcon from "/assets/search-icon.svg";
import PropTypes from "prop-types";
import styles from "./SearchBar.module.css";

function SearchBar({ setSearchPhrase }) {

  return (
    <div className={styles.searchBar}>
      <img src={SearchIcon} alt="Search icon" className={styles.icon}/>
      <input type="text" className={styles.input} placeholder="Search Notes" onChange={(e) => setSearchPhrase(e.target.value)}/>
    </div>
  );
}

SearchBar.propTypes = {
  setSearchPhrase: PropTypes.func.isRequired,
};

export default SearchBar;
