import * as React from 'react';
import { useQuery } from 'urql'

interface ArticleQuery {
    Articles: {
        id: string
        title: string
        body: string
        author?: {
            id: string
            firstName: string
            lastName: string
        }
    } []
}

const ArticleQueryDocument = /* GraphQL */ `
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

const NewsApiView = (): JSX.Element => {
    const [result] = useQuery<ArticleQuery>({ query: ArticleQueryDocument })
    return (result.map((article) => {
            <div className="card">article.body</div>
        })
    );
}

export default NewsApiView;