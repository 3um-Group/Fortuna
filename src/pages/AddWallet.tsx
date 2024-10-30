import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import detectEthereumProvider from '@metamask/detect-provider';
import { stripePublishableKey } from '../config/default';

const stripePromise = loadStripe(stripePublishableKey || '');

interface WalletFormProps {
    buttonColor?: string;
    showMetaMaskMessage?: boolean;
}

const WalletForm: React.FC<WalletFormProps> = ({
    buttonColor = 'bg-indigo-600',
    showMetaMaskMessage = true
}) => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkMetaMaskInstallation();
    }, []);

    const checkMetaMaskInstallation = async () => {
        try {
            const provider = await detectEthereumProvider({ silent: true, timeout: 3000 });
            setIsMetaMaskInstalled(!!provider);
        } catch (error) {
            console.error("Error checking for MetaMask:", error);
            setIsMetaMaskInstalled(false);
        }
    };

    const connectWallet = async () => {
        setIsConnecting(true);
        setError(null);

        try {
            const provider = await detectEthereumProvider() as any;
            if (provider) {
                const ethersProvider = new ethers.BrowserProvider(provider);
                await provider.request({ method: 'eth_requestAccounts' });
                const signer = await ethersProvider.getSigner();
                const address = await signer.getAddress();
                setWalletAddress(address);
            } else {
                throw new Error('MetaMask not detected. Please install MetaMask.');
            }
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Add Wallet</h2>
            
            {showMetaMaskMessage && isMetaMaskInstalled === false && (
                <p className="text-red-500 text-center">
                    MetaMask is not installed. Please install MetaMask to connect your wallet.
                </p>
            )}

            {isMetaMaskInstalled === true && !walletAddress && (
                <button 
                    onClick={connectWallet} 
                    disabled={isConnecting} 
                    className={`w-full py-2 px-4 text-white rounded ${isConnecting ? 'bg-gray-400' : buttonColor} transition duration-300`}
                >
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
            )}

            {walletAddress && (
                <p className="text-green-600 text-center mt-4">Connected: {walletAddress}</p>
            )}

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>
    );
};

interface AddWalletProps {
    buttonColor?: string;
    showMetaMaskMessage?: boolean;
}

const AddWallet: React.FC<AddWalletProps> = ({ buttonColor, showMetaMaskMessage }) => {
    return (
        <Elements stripe={stripePromise}>
            <WalletForm buttonColor={buttonColor} showMetaMaskMessage={showMetaMaskMessage} />
        </Elements>
    );
};

export default AddWallet;
