import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { getNotes } from "../services/api/note";
import { convertStringToDate } from "../utils/date";
import { filterNotesBySearchPhraseAndDoneStatus } from "../utils/note";

function useNote( isDone ) {
  const { user } = useAuth();
  const [notes, setNotes] = useState();
  const [searchPhrase, setSearchPhrase] = useState("");
  const filteredNotes = filterNotesBySearchPhraseAndDoneStatus(notes, searchPhrase, isDone);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let notes = await getNotes(user.id);

        notes.forEach((note) => {
          note.createdAt = convertStringToDate(note.createdAt);
        });

        setNotes(notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchData();
  }, [user.id]);

  return { filteredNotes, setNotes, setSearchPhrase };
}

export default useNote;
