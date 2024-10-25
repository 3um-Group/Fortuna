import React from 'react';
import { TokenItemProps } from '../../types/TokenItemTypes';


const TokenItem: React.FC<TokenItemProps> = ({ title, amount, icon, isNegative }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between mb-4">
      <div className="flex items-center">
        {icon && <span className="flex align-middle w-10 h-10 rounded-full text-center justify-items-center	items-center">{icon}</span>}
        <div>
          <p className="text-sm font-bold" data-testid="title">{title}</p>
          <p className="text-xs text-gray-400" data-testid="time">{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default TokenItem;