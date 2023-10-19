import clsx from 'clsx';
import * as React from 'react'

import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { BrowserProvider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'

interface WalletViewProps {
  className: string
  abi: string
  contractAddress: string
}

export const Wallet = (): React.JSX.Element => {
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

const WalletView = React.forwardRef<HTMLDivElement,WalletViewProps>(({...props}, ref): React.JSX.Element => {
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
 