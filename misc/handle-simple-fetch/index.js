import fetch from "node-fetch";

function coolFetch() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://www.learnwithjason.dev/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
              query GetLearnWithJasonEpisodes($now: DateTime!) {
                allEpisode(limit: 10, sort: {date: ASC}, where: {date: {gte: $now}}) {
                  date
                  title
                  guest {
                    name
                    twitter
                  }
                  description
                }
              }
            `,
          variables: {
            now: new Date().toISOString(),
          },
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
