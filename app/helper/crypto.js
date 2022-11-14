const crypto = require('crypto');

function randomUUID() {
    return  crypto.randomUUID();
}
module.exports = {randomUUID}