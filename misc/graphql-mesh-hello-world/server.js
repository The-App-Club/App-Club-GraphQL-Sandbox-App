const { getBuiltMesh } = require("./.mesh");

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

(async () => {
  // ここをexpressにすればOK
  const query = `
    {
      greeting
    }
  `;
  const resultInfo = await serve(query);
  console.log(JSON.stringify(resultInfo));
})();
