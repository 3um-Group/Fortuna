import React from 'react';
import { FaUser, FaAddressBook, FaHistory, FaCreditCard, FaQuestionCircle, FaCog } from 'react-icons/fa';
import ProfileMenuItem from './ProfileMenuItem';

const ProfileMenu: React.FC = () => {
    const menuItems = [
        { label: 'My Account', icon: FaUser },
        { label: 'My Contacts', icon: FaAddressBook },
        { label: 'Transaction History', icon: FaHistory },
        { label: 'Card Management', icon: FaCreditCard },
        { label: 'Help Center', icon: FaQuestionCircle },
        { label: 'Settings', icon: FaCog },
    ];

    return (
        <div className="mt-6 bg-white rounded-3xl shadow-md">
            {menuItems.map((item) => (
                <ProfileMenuItem key={item.label} icon={item.icon} label={item.label} />
            ))}
        </div>
    );
};

export default ProfileMenu;
