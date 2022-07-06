import {GraphQLClient, gql} from 'graphql-request';
import useSWR from 'swr';

const API = '/api/graphql';

const getArticlesQuery = gql`
  query {
    getArticles {
      id
      title
      content
    }
  }
`;

type FetchData = {
  getArticles: [
    {
      id: string;
      title: string;
      content: string;
    }
  ];
};

const ArticlePage = () => {
  let result;

  const client = new GraphQLClient(API);

  const {data, error} = useSWR<FetchData>(
    [getArticlesQuery],
    // fetcher
    (query) => client.request(query)
  );

  if (error) {
    result = <div>failed to load</div>;
  }
  if (!data) {
    result = <div>loading...</div>;
  } else {
    result = data.getArticles.map((article) => (
      <li key={article.id}>{article.title}</li>
    ));
  }

  return (
    <>
      <h1>Articles List</h1>
      {result}
    </>
  );
};

export default ArticlePage;
