import { Meta, StoryObj } from '@storybook/react';

import WalletView from '.';

export const Story: StoryObj<typeof WalletView> = {
  args: {
    contractAddress: 'fubar',
    abi: "fazbar"
  }
};

export const MetaStory:Meta<typeof WalletView> = {
  title: 'WalletView/UX/Compoent',
  component: WalletView,
  tags: ['autodocs'],
};

export default MetaStory;
