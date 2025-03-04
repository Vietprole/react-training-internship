import { describe, it, expect, vi } from 'vitest';
import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteBox from './NoteBox';

describe('NoteBox', () => {
  const user = userEvent.setup();
  const mockProps = {
    variant: 'primary',
    title: 'Test Note',
    createdAt: new Date('2023-01-01'),
    isDone: false,
    onDeleteButtonClick: vi.fn(),
    onDoneButtonClick: vi.fn(),
    onClick: vi.fn()
  };

  it('renders with correct content', () => {
    render(<NoteBox {...mockProps} />);
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText(/Jan, 1 2023/i)).toBeInTheDocument();
    expect(screen.getByTestId('note-box')).toHaveClass(/primary/i);
  });

  it('calls onClick when note is clicked', async () => {
    render(<NoteBox {...mockProps} />);
    await user.click(screen.getByText('Test Note'));
    expect(mockProps.onClick).toHaveBeenCalled();
  });

  it('toggles done status when done button is clicked', async () => {
    render(<NoteBox {...mockProps} />);
    const doneButton = screen.getByRole('button', { name: /mark done\/undone icon/i });
    await user.click(doneButton);
    expect(mockProps.onDoneButtonClick).toHaveBeenCalled();
  });

  it('shows delete confirmation modal when delete button is clicked', async () => {
    render(<NoteBox {...mockProps} />);
    const deleteButton = screen.getByRole('button', { name: /delete icon/i });
    await user.click(deleteButton);
    expect(mockProps.onDeleteButtonClick).toHaveBeenCalled();
  });
});
