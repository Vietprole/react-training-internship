import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { getNotes } from "../services/api/note";
import { convertStringToDate } from "../utils/date";
import { filterNotesBySearchPhraseAndDoneStatus } from "../utils/note";

function useNotes(isDone) {
  const { user } = useAuth();
  const [notes, setNotes] = useState();
  const [searchPhrase, setSearchPhrase] = useState("");
  const filteredNotes = filterNotesBySearchPhraseAndDoneStatus(
    notes,
    searchPhrase,
    isDone
  );

  useEffect(() => {
    const fetchData = async () => {
      let notes = await getNotes(user.id);
      // If no note found for an user, json-server return error instead of empty array
      // so we need to set empty note array manually
      if (!notes) {
        console.log(notes)
        setNotes([]);
        return;
      }

      notes.forEach((note) => {
        note.createdAt = convertStringToDate(note.createdAt);
      });

      setNotes(notes);
    };

    fetchData();
  }, [user.id]);

  return { filteredNotes, setNotes, setSearchPhrase };
}

export default useNotes;
