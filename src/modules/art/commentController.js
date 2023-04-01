const db = require("../../db");


async function addCommnet({artId, name, content, userId}){
    const result = await db.query(
        "insert into comments (artId, name, content, userId) values ($1, $2, $3, $4)",
        [artId, name, content, userId]
    );
}

async function getComments({artId}){
    return await db.query(
        `select id, name, content, "userId" from comments where "artId" = $1`,
        [artId]
    );
}