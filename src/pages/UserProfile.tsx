import React from 'react';
import ProfileHeader from '../components/UserProfile/ProfileHeader';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const UserProfile: React.FC = () => {
    const { user, isLoading } = useAuth0(); 

    if (isLoading || !user) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <ProfileHeader 
                avatarUrl={user.picture || 'https://via.placeholder.com/64'} 
                name={user.name || ''} 
                email={user.email || ''} 
            />
            <Outlet />
        </div>
    );
};

export default UserProfile;
