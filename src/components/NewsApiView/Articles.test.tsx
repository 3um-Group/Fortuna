import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { Client, Provider } from 'urql';
import NewsApiView from './NewsApiView';
import NewsClient from '../../api/NewsApiClient';

afterEach(cleanup);

const NewsApi: Client = NewsClient({
  region: 'us-east-1-shared-usea1-02',
  version: 2,
  key: 'cllcilper2zc701tc3wu0652t',
  environment: 'master'
});

it('renders without crashing', async () => {
  const { asFragment } = render(
    <Provider value={NewsApi}>
      <NewsApiView />
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();

  await waitFor(() => {
    // Assuming that 'Articles' is the testId assigned to the Articles container.
    expect(document.querySelectorAll('[data-testid="Articles"]').length).toBeGreaterThan(0);
  });
});
