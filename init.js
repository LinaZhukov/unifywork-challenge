/*
* This file uses postgrator to create and seed the test database
* */

const postgrator = require('postgrator');

postgrator.config.set({
    migrationDirectory: __dirname + '/migrations',
    driver: 'pg',
    host: '127.0.0.1',
    database: 'databasename',
    username: 'username',
    password: 'password'
});

postgrator.migrate('001', function (err, migrations) {
    if (err) console.log(err)
    else console.log(migrations)
});
