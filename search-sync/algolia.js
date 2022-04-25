const algoliasearch = require("algoliasearch");

const client = algoliasearch('MUMWIUC4G2', '9c8f7c1dac5838d1d31448d482277447');
const index = client.initIndex("dev_users");

function updateIndex(record) {
    return new Promise((resolve, reject) => {
        const { payload } = record.value;
        const { before, after, op } = payload;

        if (op === 'r' || op === 'c' || op === 'u') {
            console.log(`operation: ${op}, id: ${after.id}`)

            after.objectID = after.id
            index.saveObject(after).then(() => {
                resolve(after)
                console.log(`saved ${after.id}`)
            }).catch((err) => {
                console.log(`error saving ${after.id}`)
                reject(err)
            })

        } else if (op === 'd') {
            console.log(`operation: d, id: ${before.id}`)
            index.deleteObject(before.id).then(() => {
                console.log(`deleted ${before.id}`)
                resolve(before)
            }).catch((err) => {
                console.log(`error deleting ${before.id}`)
                reject(err)
            })
        }
    });
}

// exports
module.exports = {
    updateIndex
}