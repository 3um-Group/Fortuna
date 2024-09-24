import React from 'react';
import { IconType } from 'react-icons';

interface WalletItemProps {
    icon: IconType;
    label: string;
    subLabel?: string;
    onClick?: () => void;
    addNew?: boolean;
}

const WalletItem: React.FC<WalletItemProps> = ({ icon: Icon, label, subLabel, onClick, addNew = false }) => {
    return (
        <div
            className={`flex items-center justify-between px-4 py-3 cursor-pointer 
      ${addNew ? 'text-white bg-black-700 hover:bg-black-600' : 'text-black-200 hover:bg-black-800'} rounded-lg`}
            onClick={onClick}
        >
            <div className="flex items-center space-x-3">
                <Icon className={`text-2xl ${addNew ? 'text-white' : ''}`} />
                <div>
                    <span className={`font-medium ${addNew ? '' : 'text-lg'}`}>{label}</span>
                    {subLabel && <p className="text-sm text-black-400">{subLabel}</p>}
                </div>
            </div>
            {!addNew && <span className="text-black-400">&gt;</span>}
        </div>
    );
};

export default WalletItem;
