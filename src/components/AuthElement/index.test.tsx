import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories';
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react';

jest.mock('@auth0/auth0-react');

const { Login, Logout, LoginDark, LogoutLight } = composeStories(stories);

describe('AuthElement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Login button click', async () => {
    const mockLoginWithRedirect = jest.fn();
    (useAuth0 as jest.MockedFunction<typeof useAuth0>).mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
    } as Auth0ContextInterface);

    render(<Login />);

    const loginButton = screen.getByRole('button', { name: /login/i });

    // Simulate login button click
    fireEvent.click(loginButton);

    // Check if loginWithRedirect was called
    expect(mockLoginWithRedirect).toHaveBeenCalledTimes(1);
  });

  test('Logout button click', async () => {
    const mockLogout = jest.fn();
    (useAuth0 as jest.MockedFunction<typeof useAuth0>).mockReturnValue({
      logout: mockLogout,
    } as Auth0ContextInterface);

    render(<Logout />);

    const logoutButton = screen.getByRole('button', { name: /logout/i });

    // Simulate logout button click
    fireEvent.click(logoutButton);

    // Check if logout was called
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test('Login button click - dark theme', async () => {
    const mockLoginWithRedirect = jest.fn();
    (useAuth0 as jest.MockedFunction<typeof useAuth0>).mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
    } as Auth0ContextInterface);

    render(<LoginDark />);

    const loginButton = screen.getByRole('button', { name: /login/i });

    // Simulate login button click
    fireEvent.click(loginButton);

    // Check if loginWithRedirect was called
    expect(mockLoginWithRedirect).toHaveBeenCalledTimes(1);
  });

  test('Logout button click - light theme', async () => {
    const mockLogout = jest.fn();
    (useAuth0 as jest.MockedFunction<typeof useAuth0>).mockReturnValue({
      logout: mockLogout,
    } as Auth0ContextInterface);

    render(<LogoutLight />);

    const logoutButton = screen.getByRole('button', { name: /logout/i });

    // Simulate logout button click
    fireEvent.click(logoutButton);

    // Check if logout was called
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
