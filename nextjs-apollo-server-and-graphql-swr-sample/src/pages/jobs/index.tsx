import {request, gql} from 'graphql-request';
import useSWR from 'swr';

const API = 'https://api.graphql.jobs/';

const query = gql`
  query {
    jobs {
      id
      title
      applyUrl
    }
  }
`;

type FetchData = {
  jobs: {
    id: string;
    title: string;
    applyUrl: string;
  }[];
};

const getJobs = () => {};

const JobPage = () => {
  let result;
  const {data, error} = useSWR<FetchData>(
    query,
    // fecther
    (query) => request(API, query)
  );

  if (error) {
    result = <div>failed to load</div>;
  }
  if (!data) {
    result = <div>loading...</div>;
  } else {
    result = data.jobs.map((job) => (
      <div key={job.id}>
        <li key={job.title}>{job.title}</li>
        <li key={job.applyUrl}>{job.applyUrl}</li>
        <br />
      </div>
    ));
  }
  return (
    <>
      <h1>Job List</h1>
      {result}
    </>
  );
};

export default JobPage;
