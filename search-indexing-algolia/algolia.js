const algoliasearch = require("algoliasearch");

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX);

function updateIndex(record) {
  const { payload } = record.value;
  const { before, after, op } = payload;

  if (op === "r" || op === "c" || op === "u") {
    console.log(`operation: ${op}, id: ${after.id}`);

    after.objectID = after.id;
    index
      .saveObject(after)
      .then(() => {
        resolve(after);
        console.log(`saved ${after.id}`);
      })
      .catch((err) => {
        console.log(`error saving ${after.id}`);
        Promise.reject(err);
      });
  } else if (op === "d") {
    console.log(`operation: d, id: ${before.id}`);
    index
      .deleteObject(before.id)
      .then(() => {
        console.log(`deleted ${before.id}`);
        resolve(before);
      })
      .catch((err) => {
        console.log(`error deleting ${before.id}`);
        Promise.reject(err);
      });
  }
}

module.exports = {
  updateIndex,
};
