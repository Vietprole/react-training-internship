import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';
import useAuth from './hooks/useAuth';
import '@testing-library/jest-dom';

// Mock the useAuth hook
vi.mock('./hooks/useAuth', () => ({
  default: vi.fn(() => ({
    user: null,
    token: '',
    login: vi.fn(),
    logout: vi.fn()
  }))
}));

// Memory router help keeping track of routing history in memory
// and allows us to test navigation without a real browser
// You can even test navigation history
// renderApp(['/login', '/signup', '/']); // Simulates user navigating through these routes

const renderApp = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
};

describe('App Routing', () => {
  beforeEach(() => {
    // Clear all mock state but not mock implementations
    // vi.clearAllMocks();

    // Reset the mock implementation to default unauthenticated state
    useAuth.mockImplementation(() => ({
      user: null,
      token: '',
      login: vi.fn(),
      logout: vi.fn()
    }));
  });

  test('renders login page by default for unauthenticated users', () => {
    // This renders App starting at the default route "/"
    renderApp(["/"]);
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  test('redirects to home when authenticated', () => {
    useAuth.mockImplementation(() => ({
      user: { email: 'test@gmail.com' },
      token: 'fake-token',
      login: vi.fn(),
      logout: vi.fn()
    }));

    // This renders App starting at route "/login"
    renderApp(['/login']);
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
  });

  test('redirects to login when accessing protected route without auth', () => {
    renderApp(["/"]);
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

});
