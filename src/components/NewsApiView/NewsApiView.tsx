import * as React from 'react';
import { useQuery } from 'urql'
import {Card} from 'react-daisyui';

export type ArticleProps = React.HTMLAttributes<HTMLDivElement>

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

const NewsApiView = React.forwardRef<HTMLDivElement, ArticleProps>(
  (props, ref): JSX.Element => {
    const [result] = useQuery<ArticleQuery>({ query: ArticleQuerySchema });
    const { data, fetching, error } = result;

    if (fetching) return (<><p>Loading...</p></>);
    if (error) return (<><p>Oh no... {error.message}</p></>);

    return (data && data.Articles)
      ? <>{data.Articles.map((article: ArticleItem) => <Card>{article.body}</Card>)}</>
      : <><Card>No News is good news???</Card></>
  }
);

export default NewsApiView;