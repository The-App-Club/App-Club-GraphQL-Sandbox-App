import {GraphQLClient, gql} from 'graphql-request';
import useSWR from 'swr';

const API = 'https://api.github.com/graphql'; // endpoint
const repositoryOwner = 'vercel'; // the repository owner
const repositoryName = 'next.js'; // the repository name
const issuesFirst = 100; // the number of issues

const getRepositoryQuery = gql`
  query GetRepository(
    $repositoryOwner: String!
    $repositoryName: String!
    $issuesFirst: Int
  ) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      name
      issues(first: $issuesFirst) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
`;

type FetchData = {
  repository: {
    name: string;
    issues: {
      edges: {
        node: {
          id: string;
          title: string;
        };
      }[];
    };
  };
};

const IssuesPage = () => {
  let result;
  // use GraphQLClient to set Header
  const client = new GraphQLClient(API, {
    headers: {
      Authorization:
        'bearer ' + process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESSTOKEN,
    },
  });

  const {data, error} = useSWR<FetchData>(
    [getRepositoryQuery, repositoryOwner, repositoryName, issuesFirst],
    // fetcher
    (query, owner, name, first) =>
      client.request(query, {
        // variables
        repositoryOwner: owner,
        repositoryName: name,
        issuesFirst: first,
      })
  );

  if (error) {
    result = <div>failed to load</div>;
  }
  if (!data) {
    result = <div>loading...</div>;
  } else {
    result = data.repository.issues.edges.map((issue) => (
      <li key={issue.node.id}>{issue.node.title}</li>
    ));
  }

  return (
    <>
      <h1>
        {repositoryOwner}/{repositoryName} Issue List
      </h1>
      {result}
    </>
  );
};

export default IssuesPage;
