import React from "react";
import TransactionItem from "../components/Wallet/TransactionItem";
import TokenItem from "../components/Wallet/TokenItem";
import WalletCard from "../components/Wallet/WalletCard";
import {
  FaPlus,
  FaBitcoin,
  FaDollarSign,
  FaCube,
  FaSkull,
  FaPaintBrush,
  FaEthereum,
  FaHome,
} from "react-icons/fa";
import WalletItem from "../components/ManageWallet/WalletItem";
// import wallets from '../data/wallets';

import { IconType } from "react-icons";

interface Wallet {
  label: string;
  icon: IconType;
}

const wallets: Wallet[] = [
  // Add your wallet objects here
];
import { Link, useNavigate } from "react-router-dom";
const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const handleWalletClick = (walletLabel: string) => {
    console.log(`Clicked on ${walletLabel}`);
    // Handle wallet click logic here (e.g., navigate to wallet details page)
  };

  const handleAddWalletClick = () => {
    navigate("/add-wallet");
  };
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-[125vh] relative">
      <div className="mt-6 grid grid-cols-1 gap-4 w-10/12">
        <WalletCard />
      </div>
      <div role="tablist" className="tabs tabs-bordered w-full px-10">
        {/* Tokens Tab */}
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab my-4"
          aria-label="Tokens"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content">
          <TokenItem
            title="1.3135 ETH"
            amount="$120.00"
            icon={<FaEthereum />}
            isNegative={false}
          />
          <TokenItem
            title="0.045 BTC"
            amount="$1,200.00"
            icon={<FaBitcoin />}
            isNegative={false}
          />
          <TokenItem
            title="50 USDT"
            amount="$50.00"
            icon={<FaDollarSign />}
            isNegative={false}
          />
        </div>

        {/* NFTs Tab */}
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab my-4"
          aria-label="NFTs"
        />
        <div role="tabpanel" className="tab-content mb-4">
          <TokenItem
            title="CryptoPunk #1234"
            amount="Not for Sale"
            icon={<FaCube />}
            isNegative={false}
          />
          <TokenItem
            title="Bored Ape #4567"
            amount="$300,000.00"
            icon={<FaSkull />}
            isNegative={false}
          />
          <TokenItem
            title="Art Block #7890"
            amount="$15,000.00"
            icon={<FaPaintBrush />}
            isNegative={false}
          />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab my-4"
          aria-label="Activity"
        />
        <div role="tabpanel" className="tab-content">
          <div className="w-full">
            <TransactionItem
              title="Property Purchase"
              time="Today, 9:00 AM"
              amount="$250,000.00"
              icon={<FaHome />}
            />
            <TransactionItem
              title="NFT Purchase - Bored Ape #4567"
              time="Yesterday, 5:30 PM"
              amount="$300,000.00"
              icon={<FaSkull />}
              isNegative
            />
            <TransactionItem
              title="Crypto Purchase - 0.1 BTC"
              time="Yesterday, 3:45 PM"
              amount="$6,500.00"
              icon={<FaBitcoin />}
              isNegative
            />
            <TransactionItem
              title="NFT Sale - Art Block #7890"
              time="Last Week, 11:00 AM"
              amount="$15,000.00"
              icon={<FaPaintBrush />}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md w-10/12 my-10">
        <div className="space-y-2">
          {wallets?.map((wallet) => (
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
      <Link
        to="/contract"
        className="bg-white p-6 rounded-xl shadow-md w-10/12 hover:shadow-lg transition-all duration-300 mb-6"
      >
        <div className="space-y-2">Contract</div>
      </Link>
    </div>
  );
};
export default Wallet;
