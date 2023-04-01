const db = require('../../db');

async function createUser({name, age, location}){
    const result = await db.query(
        "insert into users (name, age, location) values ($1, $2, $3)",
        [name, age, location]
    );

    return result;

}

async function getUsers(){
    return await db.query("select * from users");
}

module.exports = {createUser, getUsers}
