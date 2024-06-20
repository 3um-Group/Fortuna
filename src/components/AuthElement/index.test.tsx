import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { composeStory } from '@storybook/testing-react';
import { getScreenshots } from 'storybook-addon-playwright';
import * as AuthElementStories from './index.stories';
import initStoryshots from '@storybook/addon-storyshots';
import 'jest-image-snapshot';

initStoryshots();

afterEach(cleanup);

// Correct usage of composeStory
const { LoginButton } = composeStory(AuthElementStories.LoginButton, AuthElementStories.default);

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
});

describe('Scenario: has rendering in browser', () => {
  it('Should pass image diff', async () => {
    await getScreenshots({
      onScreenshotReady: (screenshotBuffer: Buffer, baselineScreenshotPath: { screenshotIdentifier: string, screenshotsDir: string }) => {
        expect(screenshotBuffer).toMatchScreenshots({
          customSnapshotIdentifier: baselineScreenshotPath.screenshotIdentifier,
          customSnapshotsDir: baselineScreenshotPath.screenshotsDir,
        });
      },
    });
  }, 100);
});
