const pg = require('./pg-config');
const redis = require('./redis-config');

module.exports = {
    PORT: process.env.port || 3000,
    HOST: process.env.host || 'localhost',
    pg,
    redis
}
