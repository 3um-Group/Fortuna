import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LoginButton, LogoutButton } from './index';
import { Auth0Provider } from '@auth0/auth0-react';

export default {
  title: 'AuthElement',
  component: LoginButton,
} as ComponentMeta<typeof LoginButton>;

const MockAuth0Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    {children}
  </Auth0Provider>
);

const LoginTemplate: ComponentStory<typeof LoginButton> = (args) => (
  <MockAuth0Provider>
    <LoginButton {...args} />
  </MockAuth0Provider>
);



const LogoutTemplate: ComponentStory<typeof LogoutButton> = (args) => (
  <MockAuth0Provider>
    <LogoutButton {...args} />
  </MockAuth0Provider>
);

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