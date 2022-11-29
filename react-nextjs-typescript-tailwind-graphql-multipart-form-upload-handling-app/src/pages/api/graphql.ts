// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {createYoga, createSchema} from 'graphql-yoga';
import type {NextApiRequest, NextApiResponse} from 'next';

// Docs: https://vercel.com/docs/concepts/functions/serverless-functions

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const typeDefs = `
  type Query {
    hello(name: String): String!
    greetings: String
  }
  scalar File

  type Mutation {
    readTextFile(file: File!, name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_: undefined, {name}: {name: string}) => `Hello ${name || 'World'}`,
    greetings: () => 'Hellooooooooooo',
  },
  Mutation: {
    readTextFile: async (
      _: undefined,
      {file, name}: {file: File; name: string}
    ) => {
      console.log(file.name, file.size, file.type, name);
      console.log(file.stream());
      return file.name;
    },
  },
};

// https://the-guild.dev/graphql/yoga-server/docs/features/file-uploads
export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  multipart: true,
  graphqlEndpoint: '/api/graphql',
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});
