import { Meta, StoryObj } from '@storybook/react';
import GraphCard from './GraphCard';

const meta: Meta<typeof GraphCard> = {
  title: 'DashboardView/UX/GraphCard',
  component: GraphCard,
  tags: ['autodocs'],
};

export const CSF3Story: StoryObj<typeof GraphCard> = { args: {'title': 'Example'}};
export default meta;