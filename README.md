## Overview
This project creates a node.js app that exposes a rest api to manage the tate art collection.
It provides endpoints to create uses, search art, and lets users leave comments on the art.

The art modules search features are built on the full text search capability 
provided by rediSearch (by way of redis-om).

### to start app
1) run `docker-compose.yaml` with docker from the root directory of the project
```bash
    docker-compose up
```
2) inside node container run `npm run migrate` to create the database and seed the data.
3) api can be accessed from node container as follows:
- create a user
```bash
curl -d '{"name": "tomathin", "age": 27, "location": "florida"}' \
     -H "Content-Type: application/json"                         \
     -X POST http://localhost:3000/api/users
```

- get all registered users
```bash
curl http://localhost:3000/api/users
```
- search all art by title. This endpoint will do a full text search backed by rediSearch before checking the postgres db.
```bash
curl http://localhost:3000/api/art/search?search=Dog
```

- get info on art by its id
```bash
curl http://localhost:3000/api/art/20618
```
- leave a comment on art by visitor
```bash
curl -d '{"name": "ronathin", "content": "love this!!!"}'  \
     -H "Content-Type: application/json"                   \
     -X POST http://localhost:3000/api/art/20618/comments
```

- leave a comment on art by registered user
```bash
curl -d '{"userId": 1, "content": "wow"}'  \
     -H "Content-Type: application/json"                   \
     -X POST http://localhost:3000/api/art/20618/comments
```