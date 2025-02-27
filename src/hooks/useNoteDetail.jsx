import { useState, useEffect, useRef } from "react";
import { getNoteById, updateNote } from "../services/api/note";

const useNoteDetail = ({noteId, onNoteTitleUpdate}) => {
  const [note, setNote] = useState();
  const [lastSavedTitle, setLastSavedTitle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const commentInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const note = await getNoteById(noteId);
        setNote(note);
        setLastSavedTitle(note.title);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [noteId]);

  const onTitleBlur = async (event) => {
    const newTitle = event.target.value;
    // Prevent empty title from being saved
    // And revert to last saved title
    if (newTitle === "") {
      event.target.value = lastSavedTitle;
      return;
    }

    const editedNote = { ...note, title: newTitle };
    try {
      await updateNote(note.id, editedNote);
      onNoteTitleUpdate(note.id, editedNote.title);
    } catch (error) {
      console.error(error);
      event.target.value = note.title;
    } finally {
      setLastSavedTitle(newTitle);
    }
  };

  const handleSaveDescription = async (description) => {
    const noteToUpdate = { ...note, description };
    try {
      await updateNote(note.id, noteToUpdate);
      setNote(noteToUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = () => {
    try {
      const commentText = commentInputRef.current.value;
      if (!commentText.trim()) return; // Don't add empty comments

      const updatedNote = {
        ...note,
        comments: [...note.comments, commentText],
      };
      setNote(updatedNote);
      updateNote(note.id, updatedNote);

      // Clear input after adding
      commentInputRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  return {
    note,
    isLoading,
    onTitleBlur,
    handleSaveDescription,
    handleAddComment,
    commentInputRef,
  };
};

export default useNoteDetail;
