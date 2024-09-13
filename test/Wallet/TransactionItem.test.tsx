import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FaHome } from 'react-icons/fa'; // Use any icon or mock if needed
import TransactionItem from '../../src/components/Wallet/TransactionItem'; // Adjust path if necessary

describe('TransactionItem', () => {
  it('renders with provided title, time, amount, and icon', () => {
    const title = 'Purchase';
    const time = '12:00 PM';
    const amount = '$200';
    const icon = <FaHome />;

    render(<TransactionItem title={title} time={time} amount={amount} icon={icon} />);
    expect(screen.getByTestId('title')).toHaveTextContent(title);
    expect(screen.getByTestId('time')).toHaveTextContent(time);
  });

});
