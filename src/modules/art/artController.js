const db = require('../../db');
const cache = require('../../cache');

async function getArt(){
    return (await db.query("select id, title, artist, year from art"))?.rows;
}

async function findArt({id}){
    return (await db.query(
        `select id, title, artist, year from art where id = $1`,
        [id]
    ))?.rows?.[0];
}

async function searchArt({search}){
    let result = await cache.find({search});

    if(!result || result.length < 1){
        result = (await db.query(
            `select id, title, artist, year from art where title = $1`,
            [search]
        ))?.rows;

        cache.save({search, result})
        return result;
    }else{
        return result;
    }

}

module.exports = {getArt, findArt, searchArt}