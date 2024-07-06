// components/Button/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  className:string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick} className="button">
    {children}
  </button>
);

export default Button;
