const stringHash = require('string-hash');

function hashEmail(str) {
    let hashedEmail = str
    if (str.length > 0) {
        hashedEmail = stringHash(hashedEmail);
    }

    return hashedEmail;
}

module.exports = {
    hashEmail
}