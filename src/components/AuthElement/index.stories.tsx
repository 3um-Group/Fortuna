import { Meta, StoryObj } from '@storybook/react';
import AuthElement from './index';

const meta: Meta<typeof AuthElement.LoginButton> = {
  title: 'Elements/UX/AuthElement/LoginButton',
  component: AuthElement.LoginButton,
  tags: ['autodocs'],
};

export const LoginButton: StoryObj<typeof AuthElement.LoginButton> = { args: {'theme': 'dark'}};
export default meta;
