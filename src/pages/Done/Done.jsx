import styles from "./Done.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import DarkModeIcon from "/assets/dark-mode-icon.svg";
import { useState, useEffect } from "react";
import { getNotes } from "../../services/api/note";
import useAuth from "../../hooks/useAuth";
import { convertStringToDate } from "../../utils/date";
import { useOutletContext } from "react-router";
import NoteContainer from "../../components/NoteContainer/NoteContainer";

function Done() {
  const { newNote } = useOutletContext();
  const { user } = useAuth();
  const [doneNotes, setDoneNotes] = useState();
  const [searchPhrase, setSearchPhrase] = useState("");
  const filteredNotes =
    doneNotes?.filter((note) => note.title.includes(searchPhrase) && note.isDone === true) || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let notes = await getNotes(user.id);

        notes.forEach((note) => {
          note.createdAt = convertStringToDate(note.createdAt);
        });

        if (newNote) {
          notes = [...notes, newNote];
        }

        setDoneNotes(notes.filter((note) => note.isDone));
      } catch (error) {
        console.error("Error fetching notes:", error);
        // If no note found for an user, json-server return error instead of empty array
        // so we need to set new note to allow create new note
        if (newNote) {
          setDoneNotes([newNote]);
        }
      }
    };

    fetchData();
  }, [newNote, user.id]);

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
      <NoteContainer filteredNotes={filteredNotes} setNotes={setDoneNotes} />
    </div>
  );
}

export default Done;
