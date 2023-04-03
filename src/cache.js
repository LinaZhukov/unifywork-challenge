/*
* This is the wrapper for redis. It exposes two methods
* find and save that can be used to retrieve and save keys
* */

const redis = require("redis");
const {redis: config} = require('config');
const {SchemaFieldTypes} = require("redis");

let client;

(async () => {
    console.log('creating redis client')
    client = redis.createClient({
        url: config.REDIS_URL
    });

    client.on('error', (e) => {
        console.error(e);
    })

    client.on('ready', () => {
        console.log(`Redis is ready`);
    })

    client.on('connect', () => {
        console.log(`redis connected`);
    })

    await client.connect();

    console.log(await client.info())

    const buildIndex = async () => await client.ft.create(
        'idx:art:search', {
            '$.id': {
                type: SchemaFieldTypes.NUMERIC,
                AS: 'id'
            },
            '$.title': {
                type: SchemaFieldTypes.TEXT,
                AS: 'title'
            },
            '$.artist': {
                type: SchemaFieldTypes.TEXT,
                AS: 'artist'
            },
            '$.year': {
                type: SchemaFieldTypes.NUMERIC,
                AS: 'year'
            },
        }, {
            ON: 'JSON',
            PREFIX: 'art:search'
        }
    );

    await buildIndex();


})();

async function find({search}){
    console.log('finding search term ', search);
    const key = `art:search:${search}`;
    const result = await client.get(key);
    const searchResult = await client.ft.search('idx:art:search', `@title:{${search}`);
    console.log({result});
    console.log({searchResult});
    return result ? JSON.parse(result) : result;
}

function save({search, result}){
    const key = `art:search:${search}`;
    console.log('saving ', {key, result});
    client.set(key, JSON.stringify(result));
}

module.exports = {find, save}