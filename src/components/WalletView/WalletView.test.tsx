//import {cleanup, fireEvent, render, waitFoFor } '@testing-library/react';

import { cleanup, render } from '@testing-library/react';
import { composeStory } from '@storybook/react';
import { getScreenshots } from 'storybook-addon-playwright';
import initStoryshots from '@storybook/addon-storyshots';

import * as WalletViewStories from './WalletView.stories';

afterEach(cleanup);

initStoryshots();

const { WalletView } = composeStory(WalletViewStories);

describe('Scenario: has rendering in browser', () => {

  it('Should pass image diff', async () => {
    await getScreenshots({
      onScreenshotReady: (screenshotBuffer, baselineScreenshotPath) => {
        expect(screenshotBuffer).toMatchImageSnapshot({
          customSnapshotIdentifier: baselineScreenshotPath.screenshotIdentifier,
          customSnapshotsDir: baselineScreenshotPath.screenshotsDir,
        });
      },
    });
  }, 100);

  it("renders without crashing", async() => {
    const { asFragment } = render(<WalletView/>);

    expect(asFragment()).toMatchSnapshot();
  });

});
