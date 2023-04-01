/*
*  This file creates a connection pool to postgres and
*  exports a query method
* */

const { Pool } = require("pg");
const config = require('config').get('pg');

const pool = new Pool({
    user: config.PGUSER,
    host: config.PGHOST,
    database: config.PGDATABASE,
    password: config.PGPASSWORD,
    port: config.PGPORT,
})

pool.on('connect', () => {
    console.log(`connected to postgres db ${config.PGDATABASE} on port ${config.PGPORT}`)
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}
