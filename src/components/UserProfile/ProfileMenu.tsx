import React from 'react';
import { FaUser, FaHistory, FaCreditCard, FaQuestionCircle, FaCog } from 'react-icons/fa';
import ProfileMenuItem from './ProfileMenuItem';

const ProfileMenu: React.FC = () => {
    const menuItems = [
        { label: 'My Account', icon: FaUser, to: 'my-account' }, 
        { label: 'Transaction History', icon: FaHistory, to: 'transaction-history' },
        { label: 'Card Management', icon: FaCreditCard, to: 'card-management' },
        { label: 'Help Center', icon: FaQuestionCircle, to: 'help-center' },
        { label: 'Settings', icon: FaCog, to: 'settings' },
    ];

    return (
        <div className="mt-6 bg-white rounded-3xl shadow-md">
            {menuItems.map((item) => (
                <ProfileMenuItem key={item.label} icon={item.icon} label={item.label} to={item.to} />
            ))}
        </div>
    );
};

export default ProfileMenu;
