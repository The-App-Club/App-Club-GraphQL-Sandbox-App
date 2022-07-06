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

const notifySlack = (blockInfoList) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notifySlackMessage = {
        blocks: blockInfoList,
      };

      // https://www.npmjs.com/package/@slack/webhook
      const { IncomingWebhook } = require("@slack/webhook");

      const url = process.env.SLACK_WEBHOOK_URL;

      const webhook = new IncomingWebhook(url);

      const targetPayload = notifySlackMessage;

      await webhook.send(targetPayload);

      resolve({ status: 0, message: "success" });
    } catch (error) {
      reject({ status: 1, message: error });
    }
  });
};

const dressUpNotifyTemplate = (targetItem) => {
  const { userId, id, title, body } = {
    ...targetItem,
  };
  const notifyTemplate = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `*${title}*\n${body}`,
    },
    fields: [
      {
        type: "mrkdwn",
        text: `*userId*\n${userId}`,
      },
      {
        type: "mrkdwn",
        text: `*id*\n${id}`,
      },
    ],
  };

  return notifyTemplate;
};

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    getSampleList: async () => {
      const result = await getInfoList();
      const blockInfoList = [];

      const resultInfoList = JSON.parse(JSON.stringify(result));
      for (let index = 0; index < resultInfoList.length; index++) {
        const resultInfo = resultInfoList[index];
        blockInfoList.push(dressUpNotifyTemplate(resultInfo));
        blockInfoList.push({
          type: "divider",
        });
      }

      await notifySlack(blockInfoList);

      return result;
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
