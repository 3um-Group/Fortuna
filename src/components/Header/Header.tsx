import { useState } from 'react';
import NavLink from '../NavLink/NavLink';

interface HeaderProps {
    children: React.ReactNode;
    theme?: string;
}

const Header: React.FC<HeaderProps> = ({ children, theme = 'light' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to determine which logo to use based on the theme
    const getLogoSrc = () => {
        return theme === 'dark' ? '/assets/3UM-white-logo.png' : '/assets/3UM-dark-logo.png';
    };

    return (
        <header className={`bg-base-100 text-base-content p-4 ${theme} border-b border-base-300 shadow-sm`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-10">
                <img src={getLogoSrc()} alt="Logo" className="h-10 w-10" />
                    <nav className="hidden md:flex space-x-4">
                        <NavLink href="/" className="hover:text-primary">Buy</NavLink>
                        <NavLink href="/stake" className="hover:text-primary">Stake</NavLink>
                        <NavLink href="/farm" className="hover:text-primary">Farm</NavLink>
                    </nav>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {children}
                </div>

                <button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden mt-4">
                    <nav className="flex flex-col space-y-2">
                        <NavLink href="/" className="hover:text-primary">Buy</NavLink>
                        <NavLink href="/stake" className="hover:text-primary">Stake</NavLink>
                        <NavLink href="/farm" className="hover:text-primary">Farm</NavLink>
                    </nav>
                    <div className="mt-4">
                        {children}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;