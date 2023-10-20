import clsx from 'clsx'
import * as React from 'react'
import { Loading } from 'react-daisyui';

//import * as ReactGA from 'react-ga4';

interface WalletViewProps {
  className?: string
  abi?: string
  contractAddress?: string
}

const WalletView = React.forwardRef<HTMLDivElement,WalletViewProps>(({...props}, ref): React.JSX.Element => {
  const {className} = props;

//  ReactGA.send({ hitType: "pageview", page: "/wallet", title: "WalletView Called" });

  return(
    <div className={clsx(className)} ref={ref}>
        <h1>Wallet View</h1>
        <Loading variant={"ring"} />
    </div>
  )
});

export default WalletView;