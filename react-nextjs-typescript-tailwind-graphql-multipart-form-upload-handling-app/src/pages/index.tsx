import NiceFileUploader from '@/components/NiceFileUploader';
import {Box} from '@chakra-ui/react';
import {useGraphql} from '@/hooks/useGraphql';
import Link from 'next/link';

export default function Home() {
  // const {data, error} = useGraphql(` query {
  //   greetings
  // }`);
  const {data, error} = useGraphql(`{ hello(name: "Bebop") }`);

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
