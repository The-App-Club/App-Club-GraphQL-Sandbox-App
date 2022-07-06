const rp = require("request-promise");

function getInfoList() {
  return new Promise((resolve, reject) => {
    try {
      rp(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "get",
        },
        (error, response) => {
          if (error) {
            reject(error);
          }
          resolve(JSON.parse(response.body).slice(0, 3));
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = getInfoList