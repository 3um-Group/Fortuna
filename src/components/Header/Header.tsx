import { useState } from 'react';
import { LoginButton, LogoutButton } from '../AuthElement';
import NavLink from '../NavLink/NavLink';

interface HeaderProps {
    isLoggedIn: boolean;
}

const theme = 'dark';

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    {/* Desktop logo */}
                    <img src="/assets/3UM-dark-logo.png" alt="Full Logo" className="h-8 md:block hidden" />
                    {/* Mobile logo */}
                    <img src="/assets/3UM-icon-logo.png" alt="Icon Logo" className="h-8 w-8 md:hidden block rounded-full" />
                    <nav className="hidden md:flex space-x-4">
                        <NavLink href="/" className="hover:text-gray-300">Buy</NavLink>
                        <NavLink href="/stake" className="hover:text-gray-300">Stake</NavLink>
                        <NavLink href="/farm" className="hover:text-gray-300">Farm</NavLink>
                    </nav>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {isLoggedIn ? (
                        <LogoutButton theme={theme} />
                    ) : (
                        <LoginButton theme={theme} />
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
                        <NavLink href="/farm" className="hover:text-gray-300">Farm</NavLink>
                    </nav>
                    <div className="mt-4">
                        {isLoggedIn ? (
                            <LogoutButton theme={theme} />
                        ) : (
                            <LoginButton theme={theme} />
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
