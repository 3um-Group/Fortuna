import React from 'react';

interface ProfileHeaderProps {
    avatarUrl: string;
    name: string;
    email: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ avatarUrl, name, email }) => {
    return (
        <div className="relative bg-gradient-to-r from-indigo-950 to-blue-900 rounded-t-3xl h-40 flex justify-center items-center">
            <div className="absolute -bottom-10">
                <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full border-4 border-white"
                />
            </div>

            <div className="absolute bottom-10 mb-6 text-center">
                <h1 className="text-lg font-semibold text-white">{name}</h1>
                <p className="text-sm text-gray-300">{email}</p>
            </div>
        </div>
    );
};

export default ProfileHeader;
