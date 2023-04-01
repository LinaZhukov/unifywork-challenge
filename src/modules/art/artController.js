const db = require('../../db');

async function getArt(){
    return await db.query("select id, title, artist, year from art");
}

async function findArt({id}){
    return await db.query(
        `select id, title, artist, year from art where id = $1`,
        [id]
    );
}

module.exports = {getArt, findArt}