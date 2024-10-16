import { useEffect, useState } from 'react';
import contract from '../data/contracts/NFTCollectible.json';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
const abi = contract.abi;

const ContractPage: React.FC = () => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
      return;
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.error("Error connecting to wallet: ", err);
    }
  };

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initializing transaction...");
        setIsMinting(true);
        let nftTxn = await nftContract.mintNFTs(1, { value: ethers.parseEther("0.01") });

        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        setIsMinting(false);
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.error("Error minting NFT: ", err);
      setIsMinting(false);
    }
  };

  const connectWalletButton = () => (
    <button
      onClick={connectWalletHandler}
      className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-400 transition duration-300'
    >
      Connect Wallet
    </button>
  );

  const mintNftButton = () => (
    <button
      onClick={mintNftHandler}
      disabled={isMinting}
      className={`px-6 py-3 font-semibold rounded-md shadow-md text-white ${isMinting ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 focus:ring focus:ring-green-400 transition duration-300'}`}
    >
      {isMinting ? 'Minting...' : 'Mint NFT'}
    </button>
  );

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full'>
        <h1 className='text-2xl font-bold text-center mb-6'>Scrappy Squirrels NFT Minting</h1>
        <p className='text-gray-700 text-center mb-8'>
          {currentAccount
            ? 'Ready to mint your unique NFT? Click the button below!'
            : 'Connect your wallet to get started.'}
        </p>
        <div className='flex justify-center'>
          {currentAccount ? mintNftButton() : connectWalletButton()}
        </div>
      </div>
    </div>
  );
};

export default ContractPage;
