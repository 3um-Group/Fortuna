import * as React from 'react';
import { useQuery } from 'urql'

export interface ArticleItem {
    id: string
    title: string
    body: string
    author?: {
        id: string
        firstName: string
        lastName: string
    }
}

export interface ArticleQuery {
    Articles: Array<ArticleItem>
}

export const ArticleQuerySchema:string = /* GraphQL */ `
  query Articles {
    posts {
      id
      title
      body
      author {
        id
        firstName
        lastName
      }
    }
  }
`;

export default function NewsApiView(): React.JSX.Element {
    const [result] = useQuery<ArticleQuery>({ query: ArticleQuerySchema })
    const {data, fetching, error} = result;

    if (fetching) return(<div className="card"><p>Loading...</p></div>);
    if (error) return (<div className="card"><p>Oh no... {error.message}</p></div>);

    if (data && data.Articles) return data.Articles.map((article:ArticleItem) => (
        <div className="card">{article.body}</div>)
    );

    return (<div className='card'>No News is good news???</div>);
};