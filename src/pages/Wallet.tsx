import React from 'react';
import BalanceCard from '../components/Wallet/BalanceCard';
import TransactionItem from '../components/Wallet/TransactionItem';
import WalletCard from '../components/Wallet/WalletCard';
import { FaAmazon, FaStore, FaMoneyBill } from "react-icons/fa";

const Wallet: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen relative">
      <div className="mt-6 grid grid-cols-1 gap-4 w-10/12">
      <WalletCard />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 w-10/12">
        <BalanceCard title="Income" amount="$10,000" />
        <BalanceCard title="Expenses" amount="$4,800" />
      </div>

      <div className="w-10/12 mt-8">
        <h3 className="text-gray-500 font-bold mb-4">Recent Transactions</h3>
         {/* Send components as children for icon */}
         <TransactionItem
          title="Amazon"
          time="Today, 8:00 AM"
          amount="$200.00"
          icon={<FaAmazon />}
          isNegative
        />
        <TransactionItem
          title="Grocery Store"
          time="Today, 10:00 AM"
          amount="$120.00"
          icon={<FaStore />}
          isNegative
        />
        <TransactionItem
          title="Salary"
          time="Yesterday, 2:00 PM"
          amount="$4,000.00"
          icon={<FaMoneyBill   />}
        />
      </div>
    </div>
  );
};
export default Wallet;