import React from 'react';
import BalanceCard from '../components/Wallet/BalanceCard';
import TransactionItem from '../components/Wallet/TransactionItem';
import WalletCard from '../components/Wallet/WalletCard';
import { FaPlus, FaAmazon, FaStore, FaMoneyBill } from "react-icons/fa";
import WalletItem from '../components/ManageWallet/WalletItem';
import wallets  from '../data/wallets';
import { useNavigate } from 'react-router-dom';
const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const handleWalletClick = (walletLabel: string) => {
    console.log(`Clicked on ${walletLabel}`);
    // Handle wallet click logic here (e.g., navigate to wallet details page)
  };

  const handleAddWalletClick = () => {
    navigate('/add-wallet');
  };
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
      <div className="bg-white p-6 rounded-xl shadow-md w-10/12 my-10">
      <div className="space-y-2">
        {wallets.map((wallet) => (
          <WalletItem
            key={wallet.label}
            icon={wallet.icon}
            label={wallet.label}
            onClick={() => handleWalletClick(wallet.label)}
          />
        ))}
      </div>
      <WalletItem
        icon={FaPlus}
        label="Add wallet"
        addNew={true}
        onClick={handleAddWalletClick}
      />
    </div>
    </div>
  );
};
export default Wallet;
