import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DrawerMenu from '../../src/components/Wallet/DrawerMenu'; // Adjust path if necessary

describe('DrawerMenu', () => {
  it('renders the home icon', () => {
    render(<DrawerMenu />);
    const homeIcon = screen.getByTestId('home-icon');
    expect(homeIcon).toBeInTheDocument();
  });

  it('renders the wallet icon', () => {
    render(<DrawerMenu />);
    const walletIcon = screen.getByTestId('wallet-icon');
    expect(walletIcon).toBeInTheDocument();
  });

  it('renders the user icon', () => {
    render(<DrawerMenu />);
    const userIcon = screen.getByTestId('user-icon');
    expect(userIcon).toBeInTheDocument();
  });

});
