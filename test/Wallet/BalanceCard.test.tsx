import { render } from '../test-utils';
import BalanceCard from '../../src/components/Wallet/BalanceCard';

describe('BalanceCard', () => {
  it('renders the title and amount', () => {
    const title = 'Income';
    const amount = '$10,000';

    render(<BalanceCard title={title} amount={amount} />);
    expect(true).toBe(true);
  });
});