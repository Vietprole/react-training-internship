import styles from "./Home.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import DarkModeIcon from "/assets/dark-mode-icon.svg";
import { useState, useEffect } from "react";
import { getNotes } from "../../services/api/note";
import useAuth from "../../hooks/useAuth";
import { convertStringToDate } from "../../utils/date";
import { useOutletContext } from "react-router";
import NoteContainer from "../../components/NoteContainer/NoteContainer";

function Home() {
  const { newNote } = useOutletContext();
  const { token, user } = useAuth();
  const [notes, setNotes] = useState();
  const [searchPhrase, setSearchPhrase] = useState("");
  const filteredNotes =
    notes?.filter((note) => note.title.includes(searchPhrase)) || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let notes = await getNotes(token, user.id);

        notes.forEach((note) => {
          note.createdAt = convertStringToDate(note.createdAt);
        });

        if (newNote) {
          notes = [...notes, newNote];
        }

        setNotes(notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        // If no note found for an user, json-server return error instead of empty array
        // so we need to set new note to allow create new note
        if (newNote) {
          setNotes([newNote]);
        }
      }
    };

    fetchData();
  }, [newNote, token, user.id]);

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
