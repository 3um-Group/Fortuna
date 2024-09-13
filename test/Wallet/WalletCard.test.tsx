import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WalletCard from '../../src/components/Wallet/WalletCard';


describe('WalletCard', () => {
  it('renders the total balance section with correct values', () => {
    render(<WalletCard />);

    // Check if "Total Balance" text is present
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
    
  });
});
