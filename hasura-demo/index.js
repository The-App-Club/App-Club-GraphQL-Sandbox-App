/*
This is an example snippet - you should consider tailoring it
to your service.
*/
/*
Add these to your `package.json`:
  "node-fetch": "^2.5.0"
*/

// Node doesn't implement fetch so we have to import it
import fetch from "node-fetch";

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    `https://internal-dingo-84.hasura.app/v1/graphql`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": `v7xZZ1c8gJbN1bHjU7Ub7cbj7MM48sex61GrglYABMn1gS6Aeiol8WcME3gCU5Ky`,
      },
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  );

  return await result.json();
}

const operationsDoc = `
  query MyQuery @cached {
    demo {
      created_at
      id
      title
      updated_at
    }
  }
`;

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(JSON.stringify(data, null, 2));
}

startFetchMyQuery();
