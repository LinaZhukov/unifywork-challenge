/*
* This is the wrapper for redis. It exposes two methods
* find and save that can be used to retrieve and save keys.
* It uses the redis module rediSearch.
* */

const redis = require("redis");
const {redis: config} = require('config');
const {SchemaFieldTypes} = redis;

let client;

(async () => {
    client = redis.createClient({
        url: config.REDIS_URL
    });

    client.on('error', (e) => {
        console.error(e);
    })

    client.on('ready', () => {
        console.log(`redis is ready`);
    })

    const buildIndex = async () => await client.ft.create(
        'idx:artSearch', {
            id: {
                type: SchemaFieldTypes.NUMERIC,
                sortable: true
            },
            title: SchemaFieldTypes.TEXT,
            artist: SchemaFieldTypes.TEXT,
            year: SchemaFieldTypes.NUMERIC,

        }, {
            ON: 'HASH',
            PREFIX: 'art:search'
        }
    );

    await client.connect();

    try{
        await buildIndex();
    }catch (e){
        console.log('index exists, skipping creation')
    }

})();

async function find({search}){
    const lookup = `@title:{${search}}`;
    const searchResult = await client.ft.search('idx:artSearch', lookup);
    return searchResult?.total ? JSON.parse(searchResult.documents) : undefined;
}

async function save({result}){

    try{
        for(const i of result){
            const key = `art:search:${i.id}`;
            await client.set(key, JSON.stringify(i))
        }
    }catch (e){
        console.error('cant save');
        console.error(e)
    }

}


module.exports = {find, save, client}