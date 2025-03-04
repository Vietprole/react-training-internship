import { renderHook, act, waitFor } from '@testing-library/react';
import useNotes from './useNotes';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getNotes } from '../services/api/note';
import * as dateUtils from '../utils/date';
import * as noteUtils from '../utils/note';

// Mock dependencies
vi.mock('./useAuth', () => ({
  default: () => ({
    user: { id: 1 },
  }),
}));

vi.mock('../services/api/note', () => ({
  getNotes: vi.fn(),
}));

describe('useNotes', () => {
  const mockUserId = 1;
  const mockNotes = [
    {
      id: 1,
      title: 'First note',
      description: 'Description 1',
      createdAt: '2023-01-01T00:00:00.000Z',
      isDone: false
    },
    {
      id: 2,
      title: 'Second note',
      description: 'Description 2',
      createdAt: '2023-01-02T00:00:00.000Z',
      isDone: true
    },
    {
      id: 3,
      title: 'Third note',
      description: 'Description 3',
      createdAt: '2023-01-03T00:00:00.000Z',
      isDone: false
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches notes and filters notes', async () => {
    getNotes.mockResolvedValue(mockNotes);
    // Create a spy on the convertStringToDate function
    const convertStringToDateSpy = vi.spyOn(dateUtils, 'convertStringToDate');

    // Create a spy on the filterNotesBySearchPhraseAndDoneStatus function
    const filterNotesSpy = vi.spyOn(noteUtils, 'filterNotesBySearchPhraseAndDoneStatus');
    const { result } = renderHook(() => useNotes(false));

    // Initially should return null
    expect(result.current.filteredNotes).toEqual(null);

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(getNotes).toHaveBeenCalledWith(mockUserId);
    });

    await waitFor(() => {
      expect(result.current.filteredNotes.length).toBe(3);
    });

    // Verify each note has a Date object for createdAt
    expect(convertStringToDateSpy).toHaveBeenCalledTimes(3);

    act(() => {
      result.current.setSearchPhrase('First');
    });

    // Verify the filterNotesBySearchPhraseAndDoneStatus function was called
    expect(filterNotesSpy).toHaveBeenCalledWith(mockNotes, 'First', false);

    // Restore the original implementation when done
    convertStringToDateSpy.mockRestore();
  });

  test('handles API error', async () => {
    // Mock console.error to avoid cluttering test output
    const originalConsoleError = console.error;
    console.error = vi.fn();

    // Mock API error
    getNotes.mockRejectedValue(new Error('Failed to fetch notes'));

    const { result } = renderHook(() => useNotes());

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching notes:',
        expect.any(Error)
      );
    });

    expect(result.current.filteredNotes).toEqual([]);

    // Restore console.error
    console.error = originalConsoleError;
  });

  test('setNotes updates the notes state', async () => {
    getNotes.mockResolvedValue(mockNotes);

    const { result } = renderHook(() => useNotes());

    await waitFor(() => {
      expect(result.current.filteredNotes.length).toBe(3);
    });

    // Add a new note
    const newNote = {
      id: 4,
      title: 'New Note',
      description: 'New Description',
      createdAt: new Date(),
      isDone: false
    };

    act(() => {
      result.current.setNotes([...mockNotes, newNote]);
    });

    // Verify the new note is included
    await waitFor(() => {
      expect(result.current.filteredNotes.length).toBe(4);
      expect(result.current.filteredNotes[3].id).toBe(4);
    });
  });
});
