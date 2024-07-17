import { Story, Meta } from '@storybook/react';
import { Auth0Provider } from '@auth0/auth0-react'; 
import { LoginButton, LogoutButton } from './index';

type ButtonProps = {
  theme: string;
  className?: string;
};

export default {
  title: '@3UM-Components/AuthElements',
  component: LoginButton, 
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
} as Meta;

// Template for LoginButton
const LoginButtonTemplate: Story<ButtonProps> = (args) => <LoginButton {...args} />;

export const Login = LoginButtonTemplate.bind({});
Login.args = {
  theme: 'light',
  className: '',
};
Login.argTypes = {
  theme: {
    control: 'select',
    options: ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk'],
  },
  className: {
    control: 'text',
  },
};

// Template for LogoutButton
const LogoutButtonTemplate: Story<ButtonProps> = (args) => <LogoutButton {...args} />;

export const Logout = LogoutButtonTemplate.bind({});
Logout.args = {
  theme: 'light',
  className: '',
};
Logout.argTypes = {
  theme: {
    control: 'select',
    options: ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk'],
  },
  className: {
    control: 'text',
  },
};

// Combined AuthElement story
const AuthElementTemplate: Story<ButtonProps & { isLoggedIn: boolean }> = ({ isLoggedIn, ...args }) => (
  <div>
    {isLoggedIn ? <LogoutButton {...args} /> : <LoginButton {...args} />}
  </div>
);

export const AuthElementCombined = AuthElementTemplate.bind({});
AuthElementCombined.args = {
  theme: 'light',
  className: '',
  isLoggedIn: false,
};
AuthElementCombined.argTypes = {
  theme: {
    control: 'select',
    options: ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk'],
  },
  className: {
    control: 'text',
  },
  isLoggedIn: {
    control: 'boolean',
  },
};
