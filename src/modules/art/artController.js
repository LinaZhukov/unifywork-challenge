const db = require('../../db');

async function getArt(){
    return (await db.query("select id, title, artist, year from art"))?.rows;
}

async function findArt({id}){
    return (await db.query(
        `select id, title, artist, year from art where id = $1`,
        [id]
    ))?.rows?.[0];
}

module.exports = {getArt, findArt}