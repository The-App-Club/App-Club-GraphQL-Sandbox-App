const serverless = require('serverless-http');
const express = require('express');
const app = express();
const { getBuiltMesh } = require('./.mesh');

function serve(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { execute } = await getBuiltMesh();

      // Use `execute` to run a query directly and fetch data from your APIs
      const { data, errors } = await execute(query);
      if (errors) {
        reject(errors);
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

app.post('/cool', async function (req, res) {
  const body = req.body;
  const query = body.toString('utf-8');
  console.log('query', query);
  const resultInfo = await serve(query);
  res.send(JSON.stringify(resultInfo));
});

module.exports.handler = serverless(app);
