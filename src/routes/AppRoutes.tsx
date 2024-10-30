import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Wallet from '../pages/Wallet';
import PropertyDetails from '../pages/PropertyDetails';
import UserProfile from '../pages/UserProfile';
import Dashboard from '../pages/Dashboard';
import AddWallet from '../pages/AddWallet';
import Upload from '../pages/Upload';
import MyAccount from 'src/components/UserProfile/MyAccount';
import ProfileMenu from 'src/components/UserProfile/ProfileMenu';
import Settings from 'src/components/UserProfile/Settings';
import HelpCenter from 'src/components/UserProfile/HelpCenter';
import ManageCards from 'src/components/UserProfile/ManageCards';
import TransactionHistory from 'src/components/UserProfile/TransactionHistory';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ContractPage from 'src/pages/ContractPage';
import NewsFeed from 'src/pages/NewsFeed';
import Signup from 'src/pages/Signup';
import { Experiment, Variant, emitter } from '@marvelapp/react-ab-test';

const stripePromise = loadStripe('your-publishable-key-here');

declare global {
    interface Window {
        dataLayer: Record<string, any>[];
    }
}
const AppRoutes: React.FC = () => {
    useEffect(() => {
        emitter.addPlayListener((experimentName: string, variantName: string) => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'ab_test_event',
                experiment: experimentName,
                variant: variantName,
            });
        });
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route
                path="/property-details/:id"
                element={
                    <Experiment name="PropertyDetailsExperiment">
                        <Variant name="Control">
                            <PropertyDetails showMarketPriceChart={true} showSimilarHomes={true} />
                        </Variant>
                        <Variant name="Variant">
                            <PropertyDetails showMarketPriceChart={false} showSimilarHomes={false} />
                        </Variant>
                    </Experiment>
                }
            />
            <Route
                path="/news"
                element={
                    <Experiment name="NewsFeedExperiment">
                        <Variant name="Control">
                            <NewsFeed numberOfArticles={10}  />
                        </Variant>
                        <Variant name="VariantA">
                            <NewsFeed numberOfArticles={5}  />
                        </Variant>
                    </Experiment>
                }
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route
                path="/add-wallet"
                element={
                    <Experiment name="AddWalletExperiment">
                        <Variant name="Control">
                            <AddWallet buttonColor="bg-indigo-600" showMetaMaskMessage={true} />
                        </Variant>
                        <Variant name="VariantA">
                            <AddWallet buttonColor="bg-green-600" showMetaMaskMessage={false} />
                        </Variant>
                    </Experiment>
                }
            />
            <Route path="/upload" element={<Upload />} />
            <Route path="/contract" element={<ContractPage />} />
            <Route path="/profile" element={<UserProfile />}>
                <Route index element={<ProfileMenu />} />
                <Route path="my-account" element={<MyAccount />} />
                <Route path="settings" element={<Settings />} />
                <Route
                    path="help-center"
                    element={
                        <Experiment name="HelpCenterExperiment">
                            <Variant name="Control">
                                <HelpCenter icon="default" showContactInfo={false} />
                            </Variant>
                            <Variant name="VariantA">
                                <HelpCenter icon="alternate" showContactInfo={true} />
                            </Variant>
                        </Experiment>
                    }
                />
                <Route path="transaction-history" element={<TransactionHistory />} />
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
