import clsx from 'clsx';
import * as React from 'react'

import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { Connectors } from 'web3-react'

const { InjectedConnector, NetworkOnlyConnector } = Connectors

interface WalletViewProps {
  className: string
  abi: string
  contractAddress: string
}

export const infuraProjectId:string = "0a97b4abd6ed43129bbebdfae1d577c3";
export const infuraUrl:string = `https://mainnet.infura.io/v3/${infuraProjectId}`;

const Infura = new NetworkOnlyConnector({ providerURL: infuraUrl });
const MetaMask = new InjectedConnector({ supportedNetworks: [
  1,  // Mainnet
  4,  // Rinkeby
] 
});

export const connectors = { MetaMask, Infura };

export const Wallet = () => {
  const { chainId, account, isActivating, isActive } = useWeb3React<BrowserProvider>()

  const onClick = () => { isActivating(connectors.MetaMask) };

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

function Child() {
  const { connector } = useWeb3React()
  console.log(`Priority Connector is: ${getName(connector)}`)
  return null
}




const WalletView = React.forwardRef<HTMLDivElement,WalletViewProps>(({...props}, ref): JSX.Element => {
  const {className} = props;

  return(<div className={clsx(className)} ref={ref}>
    <Web3ReactProvider connectors={connectors}>
      <Wallet/>
    </Web3ReactProvider>
  </div>)
});

export default WalletView;