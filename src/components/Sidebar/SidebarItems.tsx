import React from 'react';
import { FaHome, FaFileAlt, FaWallet, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const SidebarItems: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = window.location.origin;
  };

  const menuItems = [
    { name: 'My Feed', icon: <FaHome />, link: '/' },
    { name: 'News Feed', icon: <FaFileAlt />, link: '/article' },
    { name: 'Wallet', icon: <FaWallet />, link: '/wallet' },
    {
      name: isAuthenticated ? 'Logout' : 'Login',
      icon: <FaUser />,
      onClick: isAuthenticated ? handleLogout : loginWithRedirect,
      link: '#'
    }
  ];

  return (
    <div className="h-screen w-64 z-10">
      <div className="flex flex-col justify-between h-full">

        {/* Sidebar Header */}
        <div className="flex flex-col items-center py-8">
          <Link to="/profile">
            <img 
              src="/assets/3UM-dark-logo.png" 
              alt="Company Logo" 
              className="w-20 h-20 mb-4 rounded-full border-4 border-gray-700 shadow-md" 
            />
          </Link>
          <h2 className="text-3xl font-extrabold tracking-wide">
            Fortuna
          </h2>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-grow">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className="flex items-center space-x-4 py-3 px-6 text-lg font-medium hover:bg-gray-700 hover:text-white transition-colors duration-200"
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
          <p className="text-center text-sm text-gray-500">© 2024 Fortuna</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarItems;
