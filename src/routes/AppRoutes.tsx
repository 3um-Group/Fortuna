// routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Wallet from '../pages/Wallet';
import PropertyDetails from '../pages/PropertyDetails';
import UserProfile from '../pages/UserProfile';
import Dashboard from '../pages/Dashboard';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/property-details/:id" element={<PropertyDetails />} />
            <Route path="/profile" element={<UserProfile />} />
        </Routes>
    );
};

export default AppRoutes;
