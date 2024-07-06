// components/NavLink/NavLink.tsx
import React from 'react';

interface NavLinkProps {
  href: string;
  className:string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <a href={href} className="nav-link">
    {children}
  </a>
);

export default NavLink;
