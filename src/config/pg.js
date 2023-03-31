module.exports = {
    PGUSER: process.env.PGUSER ?? 'postgres',
    PGHOST: process.env.PGHOST ?? 'localhost',
    PGPASSWORD: process.env.PGPASSWORD ?? 'password',
    PGDATABASE: process.env.PGDATABASE ?? 'postgres',
    PGPORT: process.env.PGPORT ?? 5432,
}