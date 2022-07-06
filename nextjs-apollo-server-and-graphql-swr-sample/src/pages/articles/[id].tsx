import {useRouter} from 'next/router';

import {GraphQLClient, gql} from 'graphql-request';
import useSWR from 'swr';

const API = '/api/graphql';

const getArticleById = gql`
  query ($getArticleId: Int!) {
    getArticle(id: $getArticleId) {
      id
      title
      content
    }
  }
`;

type FetchData = {
  getArticle: {
    id: string;
    title: string;
    content: string;
  };
};

const SingleArticlePage = () => {
  const router = useRouter();

  const {id} = router.query;

  let result;
  const client = new GraphQLClient(API);

  const {data, error} = useSWR<FetchData>(
    [getArticleById],
    // fetcher
    (query) =>
      client.request(query, {
        getArticleId: Number(id),
      })
  );
  console.log(data);

  if (error) {
    result = <div>failed to load</div>;
  }
  if (!data) {
    result = <div>loading...</div>;
  } else {
    result = <li key={data.getArticle.id}>{data.getArticle.title}</li>;
  }

  return (
    <>
      <h1>Articles List</h1>
      {result}
    </>
  );
};

export default SingleArticlePage;
