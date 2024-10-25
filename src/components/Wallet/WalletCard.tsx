import React from 'react';
import { FaArrowDown, FaArrowRight, FaCreditCard } from 'react-icons/fa';

const WalletCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Balance Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-gray-500 text-sm">Total Balance</span>
          <h1 className="text-3xl font-bold">$ 2,562.50</h1>
        </div>
      </div>

      {/* Wallet Footer */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        <FooterItem icon={<FaArrowDown />} label="Withdraw" bgColor="bg-red-500" />
        <FooterItem icon={<FaArrowRight />} label="Send" />
        <FooterItem icon={<FaCreditCard />} label="Cards" bgColor="bg-green-500" />
      </div>
    </div>
  );
};

// Reusable FooterItem component
interface FooterItemProps {
  icon: React.ReactNode;
  label: string;
  bgColor?: string;
}

const FooterItem: React.FC<FooterItemProps> = ({ icon, label, bgColor = 'bg-gray-200' }) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`${bgColor} p-3 rounded-full text-white mb-2`}>
        {icon}
      </div>
      <strong className="text-sm text-center">{label}</strong>
    </div>
  );
};

export default WalletCard;
