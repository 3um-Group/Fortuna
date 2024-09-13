import React from 'react';
import { FaHome, FaWallet, FaUser } from 'react-icons/fa';

const DrawerMenu: React.FC = () => {
  return (
    <div className="bg-white h-20 w-full flex items-center justify-evenly rounded-t-3xl shadow-lg fixed bottom-0">
      <span className="text-yellow-400 text-2xl cursor-pointer">
        <FaHome data-testid="home-icon" />
      </span>
      <span className="text-yellow-400 text-2xl cursor-pointer">
        <FaWallet data-testid="wallet-icon" />
      </span>
      <span className="text-yellow-400 text-2xl cursor-pointer">
        <FaUser data-testid="user-icon" />
      </span>
    </div>
  );
};

export default DrawerMenu;