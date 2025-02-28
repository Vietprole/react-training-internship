import styles from "./Done.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import DarkModeIcon from "/assets/dark-mode-icon.svg";
import NoteContainer from "../../components/NoteContainer/NoteContainer";
import useNotes from "../../hooks/useNotes";

function Done() {
  const isDone = true;
  const { filteredNotes, setNotes, setSearchPhrase} = useNotes(isDone);

  if (!filteredNotes) {
    return <div className={styles.loader}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SearchBar setSearchPhrase={setSearchPhrase} />
        <img
          src={DarkModeIcon}
          alt="Dark mode icon"
          className="dark-mode-icon"
        />
      </div>
      <h1 className={styles.title}>
        <span>Done Notes!</span>
      </h1>
      <p className={styles.description}>All your done notes are here!</p>
      <NoteContainer filteredNotes={filteredNotes} setNotes={setNotes} />
    </div>
  );
}

export default Done;
