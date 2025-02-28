import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import useNoteDetail from './useNoteDetail';
import { getNoteById, updateNote } from '../services/api/note';

// Mock the API functions
vi.mock('../services/api/note', () => ({
  getNoteById: vi.fn(),
  updateNote: vi.fn()
}));

describe('useNoteDetail', () => {
  const mockNote = {
    id: 1,
    title: 'Test Note',
    description: 'Test Description',
    comments: ['Comment 1', 'Comment 2']
  };

  const mockProps = {
    noteId: 1,
    onNoteTitleUpdate: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock default response
    getNoteById.mockResolvedValue(mockNote);
    updateNote.mockResolvedValue(mockNote);
  });

  test('fetches note data successfully', async () => {
    const { result } = renderHook(() => useNoteDetail(mockProps));

    // Check if isLoading
    expect(result.current.isLoading).toBe(true);

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(getNoteById).toHaveBeenCalledWith(1);
    expect(result.current.note).toEqual(mockNote);
  });

  test('handles fetch error', async () => {
    // Mock console.error
    const originalConsoleError = console.error;
    console.error = vi.fn();

    // Mock error response
    getNoteById.mockRejectedValue(new Error('Failed to fetch'));

    const { result } = renderHook(() => useNoteDetail(mockProps));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(console.error).toHaveBeenCalled();
    expect(result.current.note).toBeUndefined();

    // Restore console.error
    console.error = originalConsoleError;
  });

  test('updates title on blur', async () => {
    const { result } = renderHook(() => useNoteDetail(mockProps));

    // Wait for initial load
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Mock event with new title
    const mockEvent = {
      target: { value: 'Updated Title' }
    };

    // Call the blur handler
    await act(async () => {
      await result.current.onTitleBlur(mockEvent);
    });

    // Verify API call and callback were triggered
    expect(updateNote).toHaveBeenCalledWith(1, {
      ...mockNote,
      title: 'Updated Title'
    });
    expect(mockProps.onNoteTitleUpdate).toHaveBeenCalledWith(1, 'Updated Title');
  });

  test('prevents empty title and reverts to last saved', async () => {
    const { result } = renderHook(() => useNoteDetail(mockProps));

    // Wait for initial load
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Mock event with empty title
    const mockEvent = {
      target: { value: '' }
    };

    // Call the blur handler
    await act(async () => {
      await result.current.onTitleBlur(mockEvent);
    });

    // Verify API was not called
    expect(updateNote).not.toHaveBeenCalled();
    expect(mockEvent.target.value).toBe('Test Note');
  });

  test('handles title update error', async () => {
    // Mock console.error
    const originalConsoleError = console.error;
    console.error = vi.fn();

    // Mock update failure
    updateNote.mockRejectedValueOnce(new Error('Update failed'));

    const { result } = renderHook(() => useNoteDetail(mockProps));

    // Wait for initial load
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Mock event with new title
    const mockEvent = {
      target: { value: 'Will Fail' }
    };

    // Call the blur handler
    await act(async () => {
      await result.current.onTitleBlur(mockEvent);
    });

    // Verify error handling
    expect(console.error).toHaveBeenCalled();
    expect(mockEvent.target.value).toBe(mockNote.title);

    // Restore console.error
    console.error = originalConsoleError;
  });

  test('saves description successfully', async () => {
    const { result } = renderHook(() => useNoteDetail(mockProps));

    // Wait for initial load
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Call save description
    await act(async () => {
      await result.current.handleSaveDescription('New description');
    });

    // Verify API call and state update
    expect(updateNote).toHaveBeenCalledWith(1, {
      ...mockNote,
      description: 'New description'
    });

    // Note state should be updated
    expect(result.current.note.description).toBe('New description');
  });

  test('handle description update error', async () => {
    // Mock console.error
    const originalConsoleError = console.error;
    console.error = vi.fn();

    // Mock update failure
    updateNote.mockRejectedValueOnce(new Error('Update failed'));

    const { result } = renderHook(() => useNoteDetail(mockProps));

    // Wait for initial load
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Attempt to save description should throw
    await expect(async () => {
      await act(async () => {
        await result.current.handleSaveDescription('New description');
      });
    }).rejects.toThrow();

    // Verify error was logged
    expect(console.error).toHaveBeenCalled();

    // Note state should not change
    expect(result.current.note.description).toBe('Test Description');

    // Restore console.error
    console.error = originalConsoleError;
  });

  test('adds comment successfully', async () => {
    const { result } = renderHook(() => useNoteDetail(mockProps));

    // Wait for initial load
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Set up comment input ref
    const mockCommentRef = { current: { value: 'New comment' } };
    result.current.commentInputRef.current = mockCommentRef.current;

    // Add comment
    await act(async () => {
      result.current.handleAddComment();
    });

    // Verify state update and API call
    expect(updateNote).toHaveBeenCalledWith(1, {
      ...mockNote,
      comments: [...mockNote.comments, 'New comment']
    });

    // Note state should be updated with new comment
    expect(result.current.note.comments).toContain('New comment');
    expect(result.current.note.comments.length).toBe(3);

    // Input field should be cleared
    expect(mockCommentRef.current.value).toBe('');
  });

  test('ignores empty comments', async () => {
    const { result } = renderHook(() => useNoteDetail(mockProps));

    // Wait for initial load
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Set up comment input ref with empty value
    const mockCommentRef = { current: { value: '   ' } };
    result.current.commentInputRef.current = mockCommentRef.current;

    // Try to add empty comment
    await act(async () => {
      result.current.handleAddComment();
    });

    // Verify no API call happened
    expect(updateNote).not.toHaveBeenCalled();

    // Comments should remain unchanged
    expect(result.current.note.comments.length).toBe(2);
  });
});
