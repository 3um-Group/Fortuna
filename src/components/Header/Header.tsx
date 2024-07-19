import { useState } from 'react';
import NavLink from '../NavLink/NavLink';

interface HeaderProps {
    children: React.ReactNode;
    theme?: string;
}

const Header: React.FC<HeaderProps> = ({ children, theme = 'light' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={`bg-base-100 text-base-content p-4 ${theme}`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img src="/assets/3UM-dark-logo.png" alt="Full Logo" className="h-8 md:block hidden" />
                    <img src="/assets/3UM-icon-logo.png" alt="Icon Logo" className="h-8 w-8 md:hidden block rounded-full" />
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