const { ApolloServer, gql } = require("apollo-server-lambda");
const getInfoList = require("./getInfoList");

// https://github.com/konstantinmuenster/graphql-weather-api/blob/master/typeDefs/index.js
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Sample {
    userId: Int
    id: Int
    title: String
    body: String
  }

  type Query {
    hello: String
    getSampleList: [Sample]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    getSampleList: async () => {
      return await getInfoList();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context, express }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    expressRequest: express.req,
  }),
});

exports.graphqlHandler = server.createHandler();
