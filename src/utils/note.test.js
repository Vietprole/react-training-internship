import { describe, test, expect } from 'vitest';
import { getRandomNonRepeatVariant, filterNotesBySearchPhraseAndDoneStatus } from './note';

describe('getRandomNonRepeatVariant', () => {
  test('returns a variant that is different from the previous one', () => {
    const prevVariant = 'primary';
    const newVariant = getRandomNonRepeatVariant(prevVariant);
    expect(newVariant).not.toBe(prevVariant);
    expect(['secondary', 'tertiary']).toContain(newVariant);
  });

  test('returns a random variant when no previous variant is provided', () => {
    const newVariant = getRandomNonRepeatVariant();
    expect(['primary', 'secondary', 'tertiary']).toContain(newVariant);
  });
});

describe('filterNotesBySearchPhraseAndDoneStatus', () => {
  const notes = [
    { title: 'Buy groceries', isDone: true },
    { title: 'Clean house', isDone: false },
    { title: 'Do homework', isDone: true },
  ];

  test('filters notes by search phrase', () => {
    const result = filterNotesBySearchPhraseAndDoneStatus(notes, 'Buy', false);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Buy groceries');
  });

  test('filters notes by isDone status', () => {
    const result = filterNotesBySearchPhraseAndDoneStatus(notes, '', true);
    expect(result).toHaveLength(2);
    expect(result.every(note => note.isDone)).toBe(true);
  });

  test('returns all notes when search phrase is empty and isDone is false', () => {
    const result = filterNotesBySearchPhraseAndDoneStatus(notes, '', false);
    expect(result).toHaveLength(3);
  });

  test('returns null when notes is null or undefined', () => {
    const resultOfNull = filterNotesBySearchPhraseAndDoneStatus(null, 'Buy', false);
    expect(resultOfNull).toEqual(null);

    const resultOfUndefined = filterNotesBySearchPhraseAndDoneStatus(undefined, 'Buy', false);
    expect(resultOfUndefined).toEqual(null);
  });

  test('returns empty array when no notes match searchPhrase or Done', () => {
    const result = filterNotesBySearchPhraseAndDoneStatus(notes, 'xyz', false);
    expect(result).toEqual([]);
  });
});
