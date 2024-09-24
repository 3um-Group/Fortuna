import React from 'react';
import ProfileHeader from '../components/UserProfile/ProfileHeader';
import ProfileMenu from '../components/UserProfile/ProfileMenu';

const UserProfile: React.FC = () => {
    const user = {
        avatarUrl: 'https://via.placeholder.com/64',
        name: 'John Doe',
        email: 'JohnDoe3524@gmail.com',
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-700 to-blue-500 p-6">
            <ProfileHeader avatarUrl={user.avatarUrl} name={user.name} email={user.email} />
            <ProfileMenu />
        </div>
    );
};

export default UserProfile;
