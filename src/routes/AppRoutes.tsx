import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Wallet from '../pages/Wallet';
import PropertyDetails from '../pages/PropertyDetails';
import UserProfile from '../pages/UserProfile';
import Dashboard from '../pages/Dashboard';
import AddWallet from '../pages/AddWallet';
import Upload from '../pages/Upload';
import MyAccount from '../components/UserProfile/MyAccount';
import ProfileMenu from '../components/UserProfile/ProfileMenu';
import Settings from '../components/UserProfile/Settings';
import HelpCenter from '../components/UserProfile/HelpCenter';
import ManageCards from '../components/UserProfile/ManageCards';
import TransactionHistory from '../components/UserProfile/TransactionHistory';
import { Elements } from '@stripe/react-stripe-js'; 
import { loadStripe } from '@stripe/stripe-js'; 
import ContractPage from '../pages/ContractPage';
import NewsFeed from '../pages/NewsFeed';
import Article from '../pages/Article';
import Signup from '../pages/Signup';

const stripePromise = loadStripe('your-publishable-key-here'); // Add your Stripe public key

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/property-details/:id" element={<PropertyDetails />} />
            <Route path="/news" element={<NewsFeed numberOfArticles={10} />} />
            <Route path="/article" element={<Article />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/add-wallet" element={<AddWallet />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/contract" element={<ContractPage />} />
            <Route index element={<ProfileMenu />} />
            <Route path="my-account" element={<MyAccount />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help-center" element={<HelpCenter />} />
            <Route path="transaction-history" element={<TransactionHistory />} />
            <Route
                path="card-management"
                element={
                    <Elements stripe={stripePromise}>
                        <ManageCards />
                    </Elements>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
