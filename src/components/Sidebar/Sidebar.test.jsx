import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import { describe, test, expect, beforeEach, vi } from 'vitest';
import Sidebar from './Sidebar';
import { BrowserRouter } from 'react-router';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const originalModule = await import('react-router');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/' })
  };
});


const mockLogout = vi.fn();
vi.mock('../../hooks/useAuth', () => ({
  default: () => ({ logout: mockLogout })
}));

describe('Sidebar', () => {
  const mockHandleCreateNote = vi.fn();
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    render(
      <BrowserRouter>
        <Sidebar handleCreateNote={mockHandleCreateNote} />
      </BrowserRouter>
    );
  });

  test('renders all navigation items', () => {
    expect(screen.getByAltText('Home icon')).toBeInTheDocument();
    expect(screen.getByAltText('Done icon')).toBeInTheDocument();
    expect(screen.getByAltText('Plus icon')).toBeInTheDocument();
  });

  test('clicking home icon navigates to home', async () => {
    await user.click(screen.getByAltText('Home icon'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('clicking done icon navigates to done', async () => {
    await user.click(screen.getByAltText('Done icon'));
    expect(mockNavigate).toHaveBeenCalledWith('/done');
  });

  test('clicking plus icon calls handleCreateNote', async () => {
    await user.click(screen.getByAltText('Plus icon'));
    expect(mockHandleCreateNote).toHaveBeenCalled();
  });

  test('clicking logout button calls logout function', async () => {
    await user.click(screen.getByAltText('Logout icon'));
    expect(mockLogout).toHaveBeenCalled();
  });
});
