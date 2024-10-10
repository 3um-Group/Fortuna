import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Wallet from '../pages/Wallet';
import PropertyDetails from '../pages/PropertyDetails';
import Article from '../pages/Article';
import UserProfile from '../pages/UserProfile';
import Dashboard from '../pages/Dashboard';
import AddWallet from '../pages/AddWallet';
import MyAccount from 'src/components/UserProfile/MyAccount';
import ProfileMenu from 'src/components/UserProfile/ProfileMenu';
import Settings from 'src/components/UserProfile/Settings';
import HelpCenter from 'src/components/UserProfile/HelpCenter';
import ManageCards from 'src/components/UserProfile/ManageCards';
import { Elements } from '@stripe/react-stripe-js'; // Import Elements
import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe

const stripePromise = loadStripe('your-publishable-key-here'); // Add your Stripe public key

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/property-details/:id" element={<PropertyDetails />} />
            <Route path="/article" element={<Article />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/add-wallet" element={<AddWallet />} />

            <Route path="/profile" element={<UserProfile />}>
                <Route index element={<ProfileMenu />} />
                <Route path="my-account" element={<MyAccount />} />
                <Route path="settings" element={<Settings />} />
                <Route path="help-center" element={<HelpCenter />} />
                
                {/* Ensure ManageCards is wrapped in the Elements provider */}
                <Route
                    path="card-management"
                    element={
                        <Elements stripe={stripePromise}>
                            <ManageCards />
                        </Elements>
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
