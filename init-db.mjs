import pg from "pg";
import Postgrator from "postgrator";
import pgConfig from "config";
console.log(pgConfig)

const config = pgConfig;

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