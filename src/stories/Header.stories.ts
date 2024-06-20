import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default handlers
const defaultArgs = {
  onLogin: () => console.log('Login clicked'),
  onLogout: () => console.log('Logout clicked'),
  onCreateAccount: () => console.log('Create Account clicked'),
};

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
    ...defaultArgs,
  },
};

export const LoggedOut: Story = {
  args: {
    ...defaultArgs,
  },
};
