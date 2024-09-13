import React from 'react';
import { BalanceCardProps } from '../../types/BalanceCardTypes';

const BalanceCard: React.FC<BalanceCardProps> = ({ title, amount }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
      <span className="text-xs font-bold">{title}</span>
      <span className="text-lg font-light">{amount}</span>
    </div>
  );
};
export default BalanceCard;