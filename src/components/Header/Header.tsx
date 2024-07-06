// components/Header/Header.tsx
import React, { useState } from 'react';
import Button from '../Button/Button';
import NavLink from '../NavLink/NavLink';
// import logo from '../../../public/assets/3UM-dark-logo.png'
interface HeaderProps {
    isLoggedIn: boolean;
    onLogin: () => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogin, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    {/* Desktop logo */}
                    <img src="" alt="Full Logo" className="h-8 md:block hidden" />
                    {/* Mobile logo */}
                    <img src="" alt="Icon Logo" className="h-8 w-8 md:hidden block rounded-full" />
                    <nav className="hidden md:flex space-x-4">
                        <NavLink href="/" className="hover:text-gray-300">Buy</NavLink>
                        <NavLink href="/stake" className="hover:text-gray-300">Stake</NavLink>
                        <NavLink href="/farm" className="hover:text-gray-300">Farm</NavLink>
                    </nav>
                </div>

                <div className="hidden md:flex items-center space-x-4">

                    {isLoggedIn ? (
                        <Button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Logout</Button>
                    ) : (
                        <Button onClick={onLogin} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Sign up or Log In</Button>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-4">
                    <nav className="flex flex-col space-y-2">
                        <NavLink href="/" className="hover:text-gray-300">Buy</NavLink>
                        <NavLink href="/stake" className="hover:text-gray-300">Stake</NavLink>
                        <NavLink href="/Farm" className="hover:text-gray-300">Farm</NavLink>
                    </nav>
                    <div className="mt-4">
                        {isLoggedIn ? (
                            <Button onClick={onLogout} className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Logout</Button>
                        ) : (
                            <Button onClick={onLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Sign up or Log In</Button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;