import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockSetSearchPhrase = vi.fn();

  beforeEach(() => {
    render(<SearchBar setSearchPhrase={mockSetSearchPhrase} />);
  });

  test('renders search input', () => {
    expect(screen.getByPlaceholderText('Search Notes')).toBeDefined();
  });

  test('calls setSearchPhrase on input change', () => {
    const input = screen.getByPlaceholderText('Search Notes');
    fireEvent.change(input, { target: { value: 'test search' } });
    expect(mockSetSearchPhrase).toHaveBeenCalledWith('test search');
  });

  test('renders search icon', () => {
    expect(screen.getByAltText('Search icon')).toBeDefined();
  });
});
