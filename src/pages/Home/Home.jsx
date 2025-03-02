import styles from "./Home.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import DarkModeIcon from "/assets/dark-mode-icon.svg";
import NoteContainer from "../../components/NoteContainer/NoteContainer";
import useAuth from "../../hooks/useAuth";
import useNotes from "../../hooks/useNotes";

function Home() {
  const { user } = useAuth();
  const { filteredNotes, setNotes, setSearchPhrase} = useNotes(false);

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
        <span>Hello, </span>
        <span className={styles.name}>{user.email}</span>! 👋🏼
      </h1>
      <p className={styles.description}>
        All your notes are here, in one place!
      </p>
      <NoteContainer filteredNotes={filteredNotes} setNotes={setNotes}/>
    </div>
  )
}

export default Home;
