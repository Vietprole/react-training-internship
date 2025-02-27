import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import NoteContainer from './NoteContainer';
import { useOutletContext } from 'react-router';

// Mock dependencies
vi.mock('react-router', () => ({
  useOutletContext: () => ({
    isNewNoteDisplayed: false
  })
}));

vi.mock('../../hooks/useAuth', () => ({
  default: () => ({
    user: { id: 1 }
  })
}));

vi.mock('../../services/api/note', () => ({
  createNote: vi.fn(() => Promise.resolve({
    id: 1,
    userId: 1,
    title: 'New Note',
    description: '',
    variant: 'primary',
    comments: [],
    createdAt: '2025-02-27T12:00:00.000Z',
    isDone: false
  })),
  deleteNote: vi.fn(() => Promise.resolve()),
  updateNote: vi.fn(() => Promise.resolve())
}));

// Import mocked functions to verify calls
import { createNote, deleteNote, updateNote } from '../../services/api/note';

vi.mock('../../components/DeleteConfirmationModal/DeleteConfirmationModal', () => ({
  default: ({ onDeleteButtonClick, onCancelButtonClick }) => (
    <div data-testid="delete-modal">
      <button onClick={onDeleteButtonClick}>Confirm</button>
      <button onClick={onCancelButtonClick}>Cancel</button>
    </div>
  )
}));

vi.mock('../../components/NoteDetailModal/NoteDetailModal', () => ({
  default: () => <div data-testid="note-detail-modal">Note Detail Modal</div>
}));

// Setup portal container
beforeEach(() => {
  if (!document.getElementById('root')) {
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
  }

  vi.clearAllMocks();
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
      createdAt: new Date('2023-01-01'),
      isDone: false
    },
    {
      id: 2,
      userId: 1,
      title: 'Test Note 2',
      description: 'Test Description 2',
      variant: 'secondary',
      comments: [],
      createdAt: new Date('2023-01-02'),
      isDone: true
    }
  ];

  const mockSetNotes = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    render(<NoteContainer filteredNotes={mockNotes} setNotes={mockSetNotes} />);
  });

  test('renders notes correctly', () => {
    expect(screen.getByText('Test Note 1')).toBeInTheDocument();
    expect(screen.getByText('Test Note 2')).toBeInTheDocument();
  });

  test('displays note detail modal when clicking a note', async () => {


    const firstNote = screen.getByText('Test Note 1');
    await user.click(firstNote);

    expect(screen.getByTestId('note-detail-modal')).toBeInTheDocument();
  });

  test('displays delete confirmation modal when delete button clicked', async () => {


    const deleteButtons = screen.getAllByTestId('delete-button');
    await user.click(deleteButtons[0]);

    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
  });

  test('handles note deletion', async () => {


    // Open delete modal
    const deleteButtons = screen.getAllByTestId('delete-button');
    await user.click(deleteButtons[0]);

    // Confirm deletion in the portal
    const confirmButton = screen.getByText(/Delete/i);
    await user.click(confirmButton);

    expect(deleteNote).toHaveBeenCalledWith(mockNotes[0].id);
    expect(mockSetNotes).toHaveBeenCalled();
  });

  test('handles done status toggle', async () => {


    const doneButtons = screen.getAllByTestId('done-button');
    await user.click(doneButtons[0]);

    expect(updateNote).toHaveBeenCalledWith(
      mockNotes[0].id,
      expect.objectContaining({ isDone: true })
    );
  });

  test('renders NewNote component when isNewNoteDisplayed is true', () => {
    vi.mocked(useOutletContext).mockReturnValue({ isNewNoteDisplayed: true });



    expect(screen.getByPlaceholderText(/Type your note/i)).toBeInTheDocument();
  });

  test('calls createNote when a new note is created', async () => {
    vi.mocked(useOutletContext).mockReturnValue({ isNewNoteDisplayed: true });



    const textarea = screen.getByPlaceholderText(/type your note/i);
    await user.type(textarea, 'New Test Note');
    await user.tab();

    expect(createNote).toHaveBeenCalledWith(expect.objectContaining({
      title: 'New Test Note',
      userId: 1
    }));
  });
});
