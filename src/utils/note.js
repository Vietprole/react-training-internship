const VARIANTS = ["primary", "secondary", "tertiary"];

function getRandomNonRepeatVariant(prevVariant) {
  const availableVariants = VARIANTS.filter(
    (variant) => variant !== prevVariant
  );
  const randomIndex = Math.floor(Math.random() * availableVariants.length);
  return availableVariants[randomIndex];
}

function filterNotesBySearchPhraseAndDoneStatus(notes, searchPhrase, isDone) {
  // Return null if notes is null or undefined
  if (notes === undefined || notes === null) {
    return null
  }

  // Filter notes based on search phrase and done status
  // Return empty array if no note pass the filter
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchPhrase.toLowerCase()) && (!isDone || note.isDone)
  );
}

export { getRandomNonRepeatVariant, filterNotesBySearchPhraseAndDoneStatus };
