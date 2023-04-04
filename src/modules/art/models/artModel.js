/*
* This file uses redis-om to extend our redis cache so that
* we may build clean queries. It abstracts away having to manually
* manage indexes in redis and is backed by rediSearch.
* */

const {Client} = require('redis-om');
const cache = require('../../../cache');
const {Entity, Schema} = require('redis-om');

class Art extends Entity {}
const artSchema = new Schema(Art, {
    id: { type: 'number' },
    title: { type: 'string' },
    artist: { type: 'string' },
    year: { type: 'number' },
});

async function connect(){
    const client = await new Client().use(cache.client)

    /* use the client to create a Repository just for Art */
    const artRepository = client.fetchRepository(artSchema);

    /* create the index for Art */
    await artRepository?.createIndex();

    return artRepository;
}

module.exports = connect;