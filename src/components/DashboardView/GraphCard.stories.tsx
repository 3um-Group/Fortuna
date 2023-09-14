//import type { Meta, StoryObj } from '@storybook/react';
//import GraphCard, {defaultProps} from './GraphCard';

import type { Meta } from '@storybook/react';
import GraphCard from './GraphCard';

const meta = {
  title: 'DashboardView/UX/GraphCard',
  component: GraphCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  }
} satisfies Meta<typeof GraphCard>;

export default meta;

/*
type Story = StoryObj<typeof meta>;

export const UX: Story = {{args: {}};
*/