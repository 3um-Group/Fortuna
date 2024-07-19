import { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import { LoginButton, LogoutButton } from '../AuthElement';
import { Auth0Provider } from '@auth0/auth0-react';
// import React from 'react';

const meta: Meta<typeof Header> = {
  title: '@3UM-Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk'],
    },
  },
  decorators: [
    (Story) => (
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
      >
        <Story />
      </Auth0Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

const Template: Story = {
  render: (args) => (
    <div data-theme={args.theme}>
      <Header {...args} />
    </div>
  ),
};

export const LoggedOut: Story = {
  ...Template,
  args: {
    theme: 'light',
    children: <LoginButton theme="light" />,
  },
};

export const LoggedIn: Story = {
  ...Template,
  args: {
    theme: 'light',
    children: <LogoutButton theme="light" />,
  },
};

export const DarkTheme: Story = {
  ...Template,
  args: {
    theme: 'dark',
    children: <LoginButton theme="dark" />,
  },
};

export const NoAuthButtons: Story = {
  ...Template,
  args: {
    children: null,
    theme: 'dark',
  },
};

export const CustomContent: Story = {
  ...Template,
  args: {
    children: <button className="btn btn-primary">Custom Button</button>,
    theme: 'dark',
  },
};