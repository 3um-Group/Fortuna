import * as React from 'react'

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
const WalletView = React.forwardRef<HTMLDivElement>(({...props}, ref)=><div/>);

export default WalletView;