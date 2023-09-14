import { renderHook } from '@testing-library/react-hooks'

import * as React from "react";
import * as ReactDOMClient from "react-dom/client"
import { Client, Provider, useQuery } from "urql"

import NewsApiView, {ArticleQuery, ArticleQuerySchema} from "./NewsApiView"
import NewsClient from '../../api/NewsApiClient'

const NewsApi:Client = NewsClient({
  region: 'us-east-1-shared-usea1-02', 
  version: 2,
  key: 'cllcilper2zc701tc3wu0652t',
  environment: 'master'
});

it("returns more than one article from provider without error", () => {
  const div = document.createElement("div");
  const root = ReactDOMClient.createRoot(div);

  root.render(<Provider value={NewsApi}><NewsApiView/></Provider>)
  
  const [result] = renderHook(() => useQuery<ArticleQuery>({ query: ArticleQuerySchema }));
  const { data, fetching, error } = result;

  expect(fetching).toBeFalsy();
  expect(error?.message.length).toBeGreaterThan(0);
  expect(data).toHaveProperty("Article");
  expect(data?.Articles).toBeGreaterThan(0);

  root.unmount();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = ReactDOMClient.createRoot(div);
  root.render(<Provider value={NewsApi}><NewsApiView /></Provider>);
  root.unmount();
});
