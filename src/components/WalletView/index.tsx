import clsx from 'clsx';
import * as React from 'react'


import { Web3ReactProvider } from '@web3-react/core'
import { BrowserProvider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

interface WalletViewProps {
  className: string
  abi: string
  contractAddress: string
}
/*
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
*/
/*
import { Web3Provider, InfuraProvider } from "@ethersproject/providers";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import * as React from "react";

///
// https://docs.infura.io/tutorials/ethereum/send-a-transaction/use-ethers.js-infuraprovider-or-web3provider
///


export const infuraProjectId:string = "0a97b4abd6ed43129bbebdfae1d577c3";
export const infuraUrl:string = `https://mainnet.infura.io/v3/${infuraProjectId}`;

const getLibrary = () => new InfuraProvider(infuraProjectId);

/*
const CoinbaseWallet = new WalletLinkConnector({
  url: infuraUrl,
  appName: "Web3-react Demo",
  supportedChainIds: [1, 3, 4, 5, 42],
});
*/
/*
const WalletConnect = new WalletConnectConnector({
  rpcUrl: infuraUrl,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

/*
const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});
*/
/*
const WalletView = React.forwardRef<HTMLElement>(
    ({...props }): JSX.Element => {
        const { activate, deactivate, networkId, networkName, providerName } = useWeb3React();
        return (
            <Web3ReactProvider getLibrary={getLibrary}>
                <div>
                    <h1 className="text-3x1 font-bold">Infura/MetaMask/OpenZeppelin Dapp</h1>
                <div>
                    Network:{" "}
                    {networkId ? `${networkId} - ${networkName}` : "No connection"}
                </div>
                <div>Provider: {providerName}</div>
                </div>
            </Web3ReactProvider>
        );
    });

*/

import * as Connectors from '@web3-react/core/connectors'
const { InjectedConnector, NetworkOnlyConnector } = Connectors

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    4, // Rinkeby
  ],
})

const Infura = new NetworkOnlyConnector({
  providerURL: 'https://mainnet.infura.io/v3/...'
})

export const connectors = { injectedConnector, Infura }

export function getLibrary(provider: any): BrowserProvider {
  const library = new BrowserProvider(provider)
        library.pollingInterval = 12000;

  return library
}

export const Wallet = () => {
  const { chainId, account, isActivating, isActive } = useWeb3React<BrowserProvider>()

  const onClick = () => {
    isActivating(injectedConnector)
  }

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      {isActive ? (
        <div>✅ </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
    </div>
  )
}

const WalletView = React.forwardRef<HTMLDivElement,WalletViewProps>(({...props}, ref): JSX.Element => {
  const {abi, contractAddress, className} = props;

  return(<div className={clsx(className)} ref={ref}>
    <Wallet/>
  </div>)
});

export default WalletView;


 
const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] })
 
const Infura = new NetworkOnlyConnector({
  providerURL: 'https://mainnet.infura.io/v3/...'
})
 