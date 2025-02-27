import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  ...vi.importActual('react-router'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/' })
}));

const mockLogout = vi.fn();
vi.mock('../../hooks/useAuth', () => ({
  default: () => ({ logout: mockLogout })
}));

describe('Sidebar', () => {
  const mockHandleCreateNote = vi.fn();

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Sidebar handleCreateNote={mockHandleCreateNote} />
      </BrowserRouter>
    );
  });

  test('renders all navigation items', () => {
    expect(screen.getByAltText('Home icon')).toBeDefined();
    expect(screen.getByAltText('Done icon')).toBeDefined();
    expect(screen.getByAltText('Plus icon')).toBeDefined();
  });

  test('clicking home icon navigates to home', () => {
    fireEvent.click(screen.getByAltText('Home icon'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('clicking plus icon calls handleCreateNote', () => {
    fireEvent.click(screen.getByAltText('Plus icon'));
    expect(mockHandleCreateNote).toHaveBeenCalled();
  });

  test('clicking logout button calls logout function', () => {
    fireEvent.click(screen.getByAltText('Logout icon'));
    expect(mockLogout).toHaveBeenCalled();
  });
});
