import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import detectEthereumProvider from '@metamask/detect-provider';
import {stripePublishableKey} from '../config/default';
const stripePromise = loadStripe(stripePublishableKey || '');

const WalletForm: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.log('[error]', error);
        setError(error.message || 'An error occurred while processing your card.');
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        // Here you would typically send the paymentMethod.id to your server
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add Wallet</h2>
      {isMetaMaskInstalled === false && (
        <p className="text-red-500 text-center">MetaMask is not installed. Please install MetaMask to connect your wallet.</p>
      )}
      {isMetaMaskInstalled === true && !walletAddress && (
        <button 
          onClick={connectWallet} 
          disabled={isConnecting} 
          className={`w-full py-2 px-4 text-white rounded ${isConnecting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} transition duration-300`}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
      {walletAddress && (
        <p className="text-green-600 text-center mt-4">Connected: {walletAddress}</p>
      )}
      
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <h3 className="text-xl font-semibold mt-8 mb-4">Add Credit Card</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 border rounded-md bg-gray-50">
          <CardElement className="p-2" />
        </div>
        <button 
          type="submit" 
          className={`w-full py-2 px-4 text-white rounded ${!stripe || !walletAddress ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} transition duration-300`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const AddWallet: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <WalletForm />
    </Elements>
  );
};

export default AddWallet;
