import React from 'react';
import { IconType } from 'react-icons';

interface ProfileMenuItemProps {
    icon: IconType;
    label: string;
    onClick?: () => void;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon: Icon, label, onClick }) => {
    return (
        <div
            className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={onClick}
        >
            <div className="flex items-center space-x-3">
                <Icon className="text-gray-500" />
                <span>{label}</span>
            </div>
            <span>&gt;</span>
        </div>
    );
};

export default ProfileMenuItem;
