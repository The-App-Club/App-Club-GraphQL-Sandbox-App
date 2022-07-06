const { GraphQLClient, gql } = require("graphql-request");

function getInfo() {
  return new Promise(async (resolve, reject) => {
    try {
      const endpoint = "http://localhost:4000/graphql";

      const graphQLClient = new GraphQLClient(endpoint);

      const query = gql`
        {
          greeting
        }
      `;

      const data = await graphQLClient.request(query);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

(async () => {
  const info = await getInfo();
  console.log(JSON.stringify(info));
})();
