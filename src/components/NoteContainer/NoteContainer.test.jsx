import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteContainer from './NoteContainer';
import * as noteApi from '../../services/api/note';
import { useOutletContext } from 'react-router';
import useAuth from '../../hooks/useAuth';

// Mock dependencies
vi.mock('react-router', () => ({
  useOutletContext: vi.fn()
}));

vi.mock('../../hooks/useAuth', () => ({
  default: vi.fn()
}));

vi.mock('../../services/api/note', () => ({
  createNote: vi.fn(),
  deleteNote: vi.fn(),
  updateNote: vi.fn()
}));

// Mock portal container
beforeEach(() => {
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);
});

describe('NoteContainer', () => {
  const mockNotes = [
    {
      id: 1,
      userId: 1,
      title: 'Test Note 1',
      description: 'Test Description 1',
      variant: 'primary',
      comments: [],
      createdAt: new Date(),
      isDone: false
    },
    {
      id: 2,
      userId: 1,
      title: 'Test Note 2',
      description: 'Test Description 2',
      variant: 'secondary',
      comments: [],
      createdAt: new Date(),
      isDone: true
    }
  ];

  const mockSetNotes = vi.fn();

  beforeEach(() => {
    useOutletContext.mockReturnValue({
      newNote: null,
      clearNewNote: vi.fn()
    });

    useAuth.mockReturnValue({
      user: { id: 1 }
    });
  });

  test('renders notes correctly', () => {
    render(<NoteContainer filteredNotes={mockNotes} setNotes={mockSetNotes} />);
    expect(screen.getByText('Test Note 1')).toBeInTheDocument();
    expect(screen.getByText('Test Note 2')).toBeInTheDocument();
  });

  test('handles note creation', async () => {
    const mockCreatedNote = {
      id: 3,
      title: 'New Note',
      createdAt: new Date().toISOString()
    };
    noteApi.createNote.mockResolvedValueOnce(mockCreatedNote);

    render(<NoteContainer filteredNotes={mockNotes} setNotes={mockSetNotes} />);

    // Simulate creating a new note
    await fireEvent.click(screen.getByText('Test Note 1'));
    expect(noteApi.createNote).toHaveBeenCalled();
  });

  test('handles note deletion', async () => {
    render(<NoteContainer filteredNotes={mockNotes} setNotes={mockSetNotes} />);

    // Show delete modal
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await fireEvent.click(confirmButton);

    expect(noteApi.deleteNote).toHaveBeenCalledWith(1);
    expect(mockSetNotes).toHaveBeenCalled();
  });

  test('handles toggle done status', async () => {
    render(<NoteContainer filteredNotes={mockNotes} setNotes={mockSetNotes} />);

    const doneButtons = screen.getAllByRole('button', { name: /mark as done/i });
    await fireEvent.click(doneButtons[0]);

    expect(noteApi.updateNote).toHaveBeenCalledWith(1, expect.objectContaining({
      isDone: true
    }));
  });

  test('handles note detail modal', () => {
    render(<NoteContainer filteredNotes={mockNotes} setNotes={mockSetNotes} />);

    fireEvent.click(screen.getByText('Test Note 1'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Close modal
    fireEvent.mouseDown(document);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('handles empty note removal', () => {
    render(<NoteContainer filteredNotes={mockNotes} setNotes={mockSetNotes} />);

    const emptyNote = {
      id: 3,
      title: '',
      createdAt: new Date()
    };

    fireEvent.click(screen.getByText('Test Note 1'));
    expect(mockSetNotes).toHaveBeenCalled();
  });
});
