const VARIANTS = ["primary", "secondary", "tertiary"];

function getRandomNonRepeatVariant(prevVariant) {
  const availableVariants = VARIANTS.filter(
    (variant) => variant !== prevVariant
  );
  const randomIndex = Math.floor(Math.random() * availableVariants.length);
  return availableVariants[randomIndex];
}

function filterNotesBySearchPhraseAndDoneStatus(notes, searchPhrase, isDone) {
  // Return empty array if note is undefined, null, or empty array
  return notes?.filter(
    (note) =>
      note.title.includes(searchPhrase) && (!isDone || note.isDone)
  ) || [];
}

export { getRandomNonRepeatVariant, filterNotesBySearchPhraseAndDoneStatus };
