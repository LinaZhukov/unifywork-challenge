/*
* This is the wrapper for redis. It exposes two methods
* find and save that can be used to retrieve and save keys
* */

const redis = require("redis");
const {redis: config} = require('config');

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
})();

async function find({search}){
    console.log('finding search term ', search);
    const result = await client.get(search);
    console.log(result)
    return result ? JSON.parse(result) : result;
}

function save({search, result}){
    console.log('saving ', {search, result})
    client.set(search, JSON.stringify(result));
}

module.exports = {find, save}