const db = require('../../db');
const artModel = require('./models/artModel');

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
    const cache = await artModel();
    const cached = await cache.search()
        .where('title').equals(search).return.all();

    const result = cached.map(i => i.toJSON());
    if(result.length){
        console.log('cache found ', result);
        return result;
    }

    if(!cached?.length){
        const result = (await db.query(
            `select id, title, artist, year from art where title like $1`,
            [search]
        ))?.rows;

        for (const i of result){
            console.log('saving to cache ', i);
            await cache.createAndSave(i);
        }
        return result;
    }
}

module.exports = {getArt, findArt, searchArt}