/*
* This file uses postgrator to create and seed the test database
* */

const postgrator = require('postgrator');
const config = require('config').get('pg');

postgrator.config.set({
    migrationDirectory: __dirname + '/migrations',
    driver: 'pg',
    host: config.PGHOST,
    database: config.PGDATABASE,
    username: config.PGUSER,
    password: config.PGPASSWORD
});

postgrator.migrate('001', function (err, migrations) {
    if (err) console.log(err)
    else console.log(migrations)
});
