import pg from "pg";
import Postgrator from "postgrator";
import config from "config";
console.log(config)

async function doMigration() {
    const client = new pg.Client({
        host: config.pg.PGHOST,
        database: config.pg.PGDATABASE,
        username: config.pg.PGUSER,
        password: config.pg.PGPASSWORD,
        port: config.pg.PGPORT
    });

    console.log('connecting')
    await client.connect();

    const postgrator = new Postgrator({
        migrationPattern: __dirname + '/migrations/*',
        driver: "pg",
        database: config.PGDATABASE,
        // `pg` package was the reference for postgrator's original common client
        // So there isn't much to do for Postgres.
        execQuery: (query) => client.query(query),
    });

    // Migrate to latest or whatever version you want
    await postgrator.migrate();

    // close the db connectin
    await client.end();
}
doMigration().catch(console.error).finally(process.exit);