import { initializeConnector } from '@web3-react/core';
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2';

import { MAINNET_CHAINS } from '../chains';

const [mainnet, ...optionalChains] = Object.keys(MAINNET_CHAINS).map(Number);

const projectId = process.env.walletConnectProjectId;
if (!projectId) {
  throw new Error('walletConnectProjectId is not defined in the environment variables');
}

export const [walletConnectV2, hooks] = initializeConnector<WalletConnectV2>(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId,
        chains: [mainnet],
        optionalChains,
        showQrModal: true,
      },
    })
);
