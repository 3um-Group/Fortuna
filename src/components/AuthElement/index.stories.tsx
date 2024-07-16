import React from 'react';
import { Story, Meta } from '@storybook/react';
import { LoginButton, LogoutButton } from './index';
import { Auth0Provider } from "@auth0/auth0-react";

// Mock Auth0Provider for Storybook
const MockAuth0Provider = ({ children }: { children: React.ReactNode }) => (
  <Auth0Provider
  domain={process.env.REACT_APP_AUTH0_DOMAIN}
  clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    {children}
  </Auth0Provider>
);

export default {
  title: 'Components/AuthElement',
  decorators: [
    (Story) => (
      <MockAuth0Provider>
        <Story />
      </MockAuth0Provider>
    ),
  ],
} as Meta;

const LoginTemplate: Story = (args) => <LoginButton {...args} />;
const LogoutTemplate: Story = (args) => <LogoutButton {...args} />;

export const Login = LoginTemplate.bind({});
Login.args = {
  theme: 'light',
  className: 'bg-gray-100',
};

export const Logout = LogoutTemplate.bind({});
Logout.args = {
  theme: 'dark',
  className: 'bg-gray-800',
};

// Variations
export const LoginDark = LoginTemplate.bind({});
LoginDark.args = {
  theme: 'dark',
  className: 'bg-gray-800',
};

export const LogoutLight = LogoutTemplate.bind({});
LogoutLight.args = {
  theme: 'light',
  className: 'bg-gray-100',
};
