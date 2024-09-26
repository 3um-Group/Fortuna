import React from 'react';
import { FaHome, FaFileAlt, FaUser, FaWallet } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const SidebarItems: React.FC = () => {
  const menuItems = [
    { name: 'Home', icon: <FaHome />, link: '/' },
    { name: 'Article', icon: <FaFileAlt />, link: '/article' },
    { name: 'User Profile', icon: <FaUser />, link: '/profile' },
    { name: 'Wallet', icon: <FaWallet />, link: '/wallet' },
  ];

  return (
    <div className="h-screen w-64 z-1">
      <div className="flex flex-col justify-between h-full">
        {/* Sidebar content */}
        <div>
          <h2 className="text-2xl font-bold text-center py-6">Fortuna</h2>
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                    to={item.link}
                  className="flex items-center space-x-4 py-3 px-6 text-lg font-medium hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="pb-6">
          <p className="text-center text-sm text-gray-400">© 2024 Your Company</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarItems;