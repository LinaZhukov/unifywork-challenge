const { Pool } = require("pg");
const config = require('config').get('pg');

console.log(`connecting with`, config);

const connect = async (query) => {
    try {
        let pool;

        if(!pool){
            pool = new Pool({
                user: config.PGUSER,
                host: config.PGHOST,
                database: config.PGDATABASE,
                password: config.PGPASSWORD,
                port: config.PGPORT,
            });
        }

        console.log('check if pool is connected')
        if(!pool.connected){
            console.log('connecting pool')
            await pool.connect()
        }

        const res = await pool.query(query);
        console.log(res?.rows);
        await pool.end();
        return res?.rows;
    } catch (error) {
        console.log(error)
    }
}

module.exports = connect();