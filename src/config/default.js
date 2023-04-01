const pg = require('./pg-config');

module.exports = {
    PORT: process.env.port || 3000,
    HOST: process.env.host || '0.0.0.0',
    pg
}
