import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider, InfuraProvider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import NewsClient from "./NewsApiClient";
import { Client, Provider } from "urql";
import NewsApiView from "./components/NewsApiView";

const infuraProjectId:string = "0a97b4abd6ed43129bbebdfae1d577c3";
const infuraUrl:string = `https://mainnet.infura.io/v3/${infuraProjectId}`;

const NewsApi:Client = NewsClient({
  region: 'us-east-1-shared-usea1-02', 
  version: 2,
  key: 'cllcilper2zc701tc3wu0652t',
  environment: 'master'
});

///
// https://docs.infura.io/tutorials/ethereum/send-a-transaction/use-ethers.js-infuraprovider-or-web3provider
///

function getLibrary(provider) {
  return new Web3Provider(InfuraProvider);
}
const CoinbaseWallet = new WalletLinkConnector({
  url: infuraUrl,
  appName: "Web3-react Demo",
  supportedChainIds: [1, 3, 4, 5, 42],
});

const WalletConnect = new WalletConnectConnector({
  rpcUrl: infuraUrl,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

function App(): JSX.Element {
  const { activate, deactivate, networkId, networkName, providerName } =
    useWeb3React();

  const router = createBrowserRouter([    {
    path: "/NewsView",
    errorElement: (
      <div>
        <h1> Error loading route...</h1>
      </div>
    ),
    element: (<Provider value={NewsApi}><NewsApiView/></Provider>
    )
  }, {
      path: "/",
      errorElement: (
        <div>
          <h1> Error loading route...</h1>
        </div>
      ),
      element: (
        <Web3ReactProvider getLibrary={getLibrary}>
          <div>
            <h1 className="text-3x1 font-bold">
              Infura/MetaMask/OpenZeppelin Dapp
            </h1>
            <div>
              Network:{" "}
              {networkId ? `${networkId} - ${networkName}` : "No connection"}
            </div>
            <div>Provider: {providerName}</div>
          </div>
        </Web3ReactProvider>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
