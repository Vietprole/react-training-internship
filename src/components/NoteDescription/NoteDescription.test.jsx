import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import NoteDescription from './NoteDescription';

describe('NoteDescription', () => {
  const mockOnSaveDescription = vi.fn();
  const defaultDescription = 'Initial description';

  beforeEach(() => {
    render(
      <NoteDescription
        defaultDescription={defaultDescription}
        onSaveDescription={mockOnSaveDescription}
      />
    );
  });

  test('renders with default description', () => {
    expect(screen.getByText('Description')).toBeDefined();
    const textarea = screen.getByRole('textbox');
    expect(textarea.value).toBe(defaultDescription);
  });

  test('updates textarea value on change', () => {
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New description' } });
    expect(textarea.value).toBe('New description');
  });

  test('calls onSaveDescription when save button is clicked', () => {
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New description' } });
    fireEvent.click(screen.getByText('Save'));
    expect(mockOnSaveDescription).toHaveBeenCalledWith('New description');
  });

  test('resets to default description when cancel is clicked', () => {
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New description' } });
    fireEvent.click(screen.getByText('Cancel'));
    expect(textarea.value).toBe(defaultDescription);
  });
});
