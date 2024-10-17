import Web3 from 'web3';

const contractABI: any[] = [
  // ABI of your ERC-1155 or other token contract
];

const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
const web3 = new Web3(Web3.givenProvider);

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to get total supply of tokens
export const getTotalSupply = async (): Promise<number> => {
  const totalSupply = await contract.methods.totalSupply().call();
  if (typeof totalSupply === 'string') {
    return parseInt(totalSupply, 10);
  }
  throw new Error('Invalid totalSupply value');
};
export const getUserBalance = async (userAddress: string): Promise<number> => {
  const balance = await contract.methods.balanceOf(userAddress).call();
  if (typeof balance === 'string') {
    return parseInt(balance, 10);
  }
  throw new Error('Invalid balance value');
};
