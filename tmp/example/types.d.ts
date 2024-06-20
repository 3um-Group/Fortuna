// src/react-daisyui.d.ts
declare module "react-daisyui" {
  export const Button: any;
  export const Drawer: any;
  export const Menu: any;
  export const Card: any;
  export const Loading: any;
  export const Theme: any;
}

declare module "tailwind-merge";
declare module "storybook-addon-playwright";
declare module "react-ga4";
declare module "@auth0/auth0-react" {
  export function useAuth0(): any;
}

declare module "@storybook/testing-react" {
  export const composeStory: any;
}

declare module "jest-image-snapshot" {
  export const toMatchImageSnapshot: any;
}

declare module "@auth0/auth0-react"{
    export const Auth0Provider: any;
}