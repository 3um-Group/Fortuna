import React from 'react';
import { FaEdit } from 'react-icons/fa';

interface ProfileHeaderProps {
    avatarUrl: string;
    name: string;
    email: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ avatarUrl, name, email }) => {
    return (
        <div className="bg-gradient-to-b from-purple-600 to-indigo-700 text-white p-6 rounded-b-3xl">
            <div className="flex items-center space-x-4">
                <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full border-2 border-white"
                />
                <div>
                    <h1 className="text-xl font-bold">{name}</h1>
                    <p className="text-sm">{email}</p>
                </div>
                <button className="ml-auto bg-white p-2 rounded-full">
                    <FaEdit className="text-indigo-700" />
                </button>
            </div>
        </div>
    );
};

export default ProfileHeader;
