import { useState, useEffect } from "react";

//TODO Pass object for > 3 params
function useNoteBoxState(
  title,
  handleEmptyNote,
  onDeleteButtonClick,
  onDoneButtonClick,
  handleNewNote
) {
  const [isEditing, setIsEditing] = useState(title === "" ? true : false);
  const [currentTitle, setCurrentTitle] = useState(title);

  useEffect(() => {
    setCurrentTitle(title);
  }, [title]);

  const handleBlur = () => {
    setIsEditing(false);

    if (currentTitle === "") {
      handleEmptyNote();
      return;
    }

    if (isEditing) {
      handleNewNote(currentTitle);
    }
  };

  const handleDeleteButtonClick = (e) => {
    e.stopPropagation(); // Stop event from bubbling up to parent
    onDeleteButtonClick();
  };

  const handleToggleDoneClick = (e) => {
    e.stopPropagation(); // Stop event from bubbling up to parent
    onDoneButtonClick();
  };

  return {
    isEditing,
    currentTitle,
    setCurrentTitle,
    handleBlur,
    handleDeleteButtonClick,
    handleToggleDoneClick,
  };
}

export default useNoteBoxState;
