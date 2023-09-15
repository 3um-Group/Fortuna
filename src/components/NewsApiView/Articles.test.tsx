import 'module-alias/register';

//import { Client, Provider, useQuery } from "urql"

//import {cleanup, fireEvent, render, waitFoFor } '@testing-library/react';
//import { renderHook, RenderOptions, RenderResult } from '@testing-library/react-hooks'

import {cleanup, render, waitFor } from '@testing-library/react';
import { Client, Provider } from "urql";

import NewsApiView, {ArticleQuery, ArticleQuerySchema} from "./NewsApiView"
import NewsClient from '../../api/NewsApiClient'

afterEach(cleanup);

const NewsApi:Client = NewsClient({
  region: 'us-east-1-shared-usea1-02', 
  version: 2,
  key: 'cllcilper2zc701tc3wu0652t',
  environment: 'master'
});

/*
it("returns more than one article from provider without error", () => {
  const {queryByCardText, getByCardText} = render(
    <Provider value={NewsApi}><NewsApiView/></Provider>
  );
  
  const {result} = renderHook(() => useQuery<ArticleQuery>({ query: ArticleQuerySchema }));
  const { data, fetching, error } = result;

  expect(fetching).toBeFalsy();
  expect(error?.message.length).toBeGreaterThan(0);
  expect(data).toHaveProperty("Article");
  expect(data?.Articles).toBeGreaterThan(0);

  expect(queryByCardText(/No News/i)).toBeTruthy();
  fireEvent.click(getByCardText(/No News/i));

});
*/

it("renders without crashing", async() => {
  const { queryByTestId, asFragment } = render(<Provider value={NewsApi}><NewsApiView /></Provider>);

  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
    //expect(queryByTestId('Articles').childNodes.length).toBeGreaterThan(0)
  });
});
