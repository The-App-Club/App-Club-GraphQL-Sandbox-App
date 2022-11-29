import NiceFileUploader from '@/components/NiceFileUploader';
import {Box} from '@chakra-ui/react';
import {gql} from 'graphql-request';
import {useGraphql} from '@/hooks/useGraphql';
import Link from 'next/link';

const query = gql`
  query {
    hello(name: "Bebop")
  }
`;

console.log(query);

export default function Home() {
  // const {data, error} = useGraphql(` query {
  //   greetings
  // }`);
  const {data, error} = useGraphql(query);

  if (error) return <div>Failed to load: {error.message} </div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Box className="max-w-[30rem] mx-auto w-full overflow-hidden p-2">
      {/* <div>{data.greetings}</div> */}
      <div>{data.hello}</div>
      <Link href={'/api/graphql'}>
        <a>Yoga GraphiQL</a>
      </Link>
      <NiceFileUploader />
    </Box>
  );
}
