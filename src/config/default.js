const pg = require('./pg');

module.exports = {
    PORT: process.env.port || 3000,
    pg
}
