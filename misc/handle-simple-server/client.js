import fetch from "node-fetch";
function coolFetch() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
              {
                hello
              }
            `,
        }),
      });
      resolve(await response.json());
    } catch (error) {
      reject(error);
    }
  });
}

(async () => {
  const resultInfo = await coolFetch();
  console.log(JSON.stringify(resultInfo));
})();
