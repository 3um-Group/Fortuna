import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Wallet from '../../src/pages/Wallet';

// Mocking components
jest.mock('../../src/components/Wallet/BalanceCard', () => () => <div>BalanceCard</div>);
jest.mock('../../src/components/Wallet/TransactionItem', () => () => <div>TransactionItem</div>);
jest.mock('../../src/components/Wallet/DrawerMenu', () => () => <div>DrawerMenu</div>);
jest.mock('../../src/components/Wallet/WalletCard', () => () => <div>WalletCard</div>);

describe('Wallet', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Wallet />
      </MemoryRouter>
    );
  });

  it('renders WalletCard component', () => {
    expect(screen.getByText('WalletCard')).toBeInTheDocument();
  });
});
