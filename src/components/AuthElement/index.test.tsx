// import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginButton, LogoutButton } from './index';

// Mock the useAuth0 hook
const loginWithRedirectMock = jest.fn();
const logoutMock = jest.fn();

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    loginWithRedirect: loginWithRedirectMock,
    logout: logoutMock,
  }),
}));

describe('AuthElement', () => {
  describe('LoginButton', () => {
    it('renders correctly', () => {
      render(<LoginButton theme="light" />);
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('calls loginWithRedirect when clicked', async () => {
      render(<LoginButton theme="light" />);
      const button = screen.getByRole('button', { name: /login/i });
      
      await act(async () => {
        fireEvent.click(button);
      });
  
      expect(loginWithRedirectMock).toHaveBeenCalled();
    });

    it('applies the correct theme', () => {
      render(<LoginButton theme="dark" />);
      expect(screen.getByRole('button', { name: /login/i })).toHaveAttribute('data-theme', 'dark');
    });
  });

  describe('LogoutButton', () => {
    it('renders correctly', () => {
      render(<LogoutButton theme="light" />);
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });

    it('calls logout when clicked', async () => {
      render(<LogoutButton theme="light" />);
      const button = screen.getByRole('button', { name: /logout/i });
      
      await act(async () => {
        fireEvent.click(button);
      });
  
      expect(logoutMock).toHaveBeenCalledWith({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    });

    it('applies the correct theme', () => {
      render(<LogoutButton theme="dark" />);
      expect(screen.getByRole('button', { name: /logout/i })).toHaveAttribute('data-theme', 'dark');
    });
  });
});