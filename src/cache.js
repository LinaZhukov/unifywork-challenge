/*
* This is the wrapper for redis. It exposes two methods
* find and save that can be used to retrieve and save keys.
* As well as the redis connection.
* */

const redis = require("redis");
const {redis: config} = require('config');

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
    });

    client.on('connected', () => {
        console.log(`redis is connected`);
    })

    await client.connect();
})();

async function find({key, prefix}){
    try{
        return await client.get(`${prefix}:${key}`);
    }catch (e){
        console.error(e);
    }
}

async function save({key, prefix, value}){
    try{
        await client.set(`${prefix}:${key}`, JSON.stringify(value));
    }catch (e){
        console.error(e);
    }
}


module.exports = {find, save, client}