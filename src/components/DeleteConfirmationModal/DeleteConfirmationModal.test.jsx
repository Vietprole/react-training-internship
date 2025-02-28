import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteConfirmationModal from './DeleteConfirmationModal';

describe('DeleteConfirmationModal', () => {
  const mockOnDelete = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal with correct content', () => {
    render(
      <DeleteConfirmationModal
        onDeleteButtonClick={mockOnDelete}
        onCancelButtonClick={mockOnCancel}
      />
    );

    expect(screen.getByText('Confirm deletion')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByAltText('Close icon')).toBeInTheDocument();
  });

  it('calls onDeleteButtonClick when delete button is clicked', () => {
    render(
      <DeleteConfirmationModal
        onDeleteButtonClick={mockOnDelete}
        onCancelButtonClick={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('calls onCancelButtonClick when cancel button is clicked', () => {
    render(
      <DeleteConfirmationModal
        onDeleteButtonClick={mockOnDelete}
        onCancelButtonClick={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancelButtonClick when close icon is clicked', () => {
    render(
      <DeleteConfirmationModal
        onDeleteButtonClick={mockOnDelete}
        onCancelButtonClick={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByAltText('Close icon'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
