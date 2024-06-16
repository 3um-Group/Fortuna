import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { composeStory } from '@storybook/react';
import { getScreenshots } from 'storybook-addon-playwright';

import * as AuthElementStories from './index.stories';

import initStoryshots from '@storybook/addon-storyshots';

initStoryshots();

afterEach(cleanup);

const { LoginButton } = composeStory(AuthElementStories.meta);

describe('Scenario: has Login Button', () => {
  test('should render in DOM with label "Login"', () => {

    render(<LoginButton />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement.textContent).toEqual("Login");

    fireEvent.click(buttonElement);
  });

  test('should render in DOM with clickable events', () => {

    render(<LoginButton />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
  });
})

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
});
