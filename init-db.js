/*
* This file uses postgrator to manage the creation
* and seeding of the database. It should be run
* once before the api is tested.
* */

const pg = require('pg');
const Postgrator = require('postgrator');
const {pg: config} = require('config');

async function doMigration() {
    const client = new pg.Client({
        host: config.PGHOST,
        database: config.PGDATABASE,
        username: config.PGUSER,
        password: config.PGPASSWORD,
        port: config.PGPORT
    });

    await client.connect();

    const postgrator = new Postgrator({
        migrationPattern: __dirname + '/migrations/*',
        driver: "pg",
        database: config.PGDATABASE,
        execQuery: (query) => client.query(query),
    });

    postgrator.on("migration-started", (m) => console.log(m))

    // Migrate to latest or whatever version you want
    await postgrator.migrate();

    // close the db connection
    await client.end();
}

doMigration().catch((e) => console.error(e));
