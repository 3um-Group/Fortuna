import { getTotalSupply, getUserBalance } from '../../src/services/ContractService';
import Web3 from 'web3';

// Mock web3.js
jest.mock('web3', () => {
  const mockCall = jest.fn();

  const mockContractMethods = {
    totalSupply: jest.fn().mockReturnValue({
      call: mockCall.mockResolvedValue('10000'),
    }),
    balanceOf: jest.fn().mockReturnValue({
      call: mockCall.mockResolvedValue('5000'),
    }),
  };

  const mockContract = jest.fn().mockImplementation(() => ({
    methods: mockContractMethods,
  }));

  const Web3Mock: jest.MockedClass<typeof Web3> & { givenProvider: any } = jest.fn().mockImplementation(() => ({
    eth: {
      Contract: mockContract,
    },
  })) as any;

  Web3Mock.givenProvider = {
    isMetaMask: true,
  };

  return Web3Mock;
});

// Mock the contract instance
jest.mock('../../src/services/ContractService', () => {
  const originalModule = jest.requireActual('../../src/services/ContractService');
  return {
    ...originalModule,
    contract: {
      methods: {
        totalSupply: jest.fn().mockReturnValue({
          call: jest.fn().mockResolvedValue('10000'),
        }),
        balanceOf: jest.fn().mockReturnValue({
          call: jest.fn().mockResolvedValue('5000'),
        }),
      },
    },
  };
});

describe('ContractService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTotalSupply', () => {
    it('should return total supply of tokens', async () => {
      const totalSupply = await getTotalSupply();
      expect(totalSupply).toBe(5000);
    });
  });

  describe('getUserBalance', () => {
    const userAddress = '0xE2C23613ae509312d4889b685442F27B191A3067';
    it('should return user balance of tokens', async () => {
      const balance = await getUserBalance(userAddress);
      expect(balance).toBe(5000);
    });
  });
});