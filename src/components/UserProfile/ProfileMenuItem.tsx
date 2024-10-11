import React from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

interface ProfileMenuItemProps {
    icon: IconType;
    label: string;
    to: string;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon: Icon, label, to }) => {
    return (
        <Link to={to} className="flex items-center justify-between px-4 py-7 cursor-pointer hover:bg-gray-100">
            <div className="flex items-center space-x-3">
                <Icon className="text-gray-500" />
                <span>{label}</span>
            </div>
            <span>&gt;</span>
        </Link>
    );
};

export default ProfileMenuItem;
