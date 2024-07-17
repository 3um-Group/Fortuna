import type { Preview } from "@storybook/react";
import { withTests } from '@storybook/addon-jest';

import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Enable interactions debugger
    interactions: { panelPosition: 'bottom' },
  },
  decorators: [
    withTests({
      results: [], // You can load your Jest results here if needed
    }),
  ],
};

export default preview;