
- update `init-db.mjs` with the correct absolute path for `the-tate-collection.csv`
- create a user
```bash
curl -d '{"name": "tomathin", "age": 27, "location": "florida"}' \
     -H "Content-Type: application/json"                         \
     -X POST http://localhost:3000/api/users

```