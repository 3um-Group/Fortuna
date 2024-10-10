import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Wallet from '../pages/Wallet';
import PropertyDetails from '../pages/PropertyDetails';
import Article from '../pages/Article';
import UserProfile from '../pages/UserProfile';
import Dashboard from '../pages/Dashboard';
import AddWallet from '../pages/AddWallet';
import Upload from '../pages/Upload';
const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/property-details/:id" element={<PropertyDetails />} />
            <Route path="/article" element={<Article />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/add-wallet" element={<AddWallet />} />
            <Route path="/upload" element={<Upload />} />
        </Routes>
    );
};

export default AppRoutes;
