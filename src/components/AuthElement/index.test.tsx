import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('@auth0/auth0-react');

const { Login, Logout } = composeStories(stories);

describe('AuthElement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockLoginWithRedirect = jest.fn();
  const mockLogout = jest.fn();

  (useAuth0 as jest.Mock).mockReturnValue({
    isAuthenticated: false,
    loginWithRedirect: mockLoginWithRedirect,
    logout: mockLogout,
  });

  test('Login button click', async () => {
    render(<Login />);

    const loginButton = screen.getByRole('button', { name: /login/i });

    // Simulate login button click
    fireEvent.click(loginButton);

    // Check if loginWithRedirect was called
    expect(mockLoginWithRedirect).toHaveBeenCalledTimes(1);
  });

  test('Logout button click', async () => {
    render(<Logout />);

    const logoutButton = screen.getByRole('button', { name: /logout/i });

    // Simulate logout button click
    fireEvent.click(logoutButton);

    // Check if logout was called
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
