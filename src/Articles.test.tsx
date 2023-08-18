import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import NewsApiView, {ArticleQuery, ArticleQuerySchema} from "./components/NewsApiView";
import { Client, Provider, useQuery } from "urql";
import NewsClient from './NewsApiClient';

const NewsApi:Client = NewsClient({
  region: 'us-east-1-shared-usea1-02', 
  version: 2,
  key: 'cllcilper2zc701tc3wu0652t',
  environment: 'master'
});

it("returns more than one article from provider without error", () => {
  const [result] = useQuery<ArticleQuery>({ query: ArticleQuerySchema });
  const { data, fetching, error } = result;

  expect(fetching).toBeFalsy();
  expect(error?.message.length).toBeGreaterThan(0);
  expect(data).toHaveProperty("Article");
  expect(data?.Articles).toBeGreaterThan(0);
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = ReactDOMClient.createRoot(div);
  root.render(<Provider value={NewsApi}><NewsApiView /></Provider>);
  root.unmount();
});
