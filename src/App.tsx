import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useWeb3 } from "@openzeppelin/network/react";

const infuraProjectId = "0a97b4abd6ed43129bbebdfae1d577c3";

function App(): JSX.Element {
  const web3Context = useWeb3(
    `wss://mainnet.infura.io/ws/v3/${infuraProjectId}`
  );
  const { networkId, networkName, providerName } = web3Context;

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: (
        <div>
          <h1> Error loading route...</h1>
        </div>
      ),
      element: (
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
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
