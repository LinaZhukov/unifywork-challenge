Write an AWS Lambda Function in Node
- ✓ The project must use a Docker-Compose that launches a) a container to test the lambda locally b) a Redis instance and c) a Postgres instance
- ✓ Your lambda function must implement a REST API. The rest API can do anything you want—make it fun
- ✓ Your lambda must hit a Postgres DB and must use Postgrator for SQL-first data migrations to create the database and/or seed any data
- Your lambda function should implement a lazy cache in some way that uses Redis. Bonus points if you use redis search
- ✓ Share your code either via a zip file or GitHub/Bitbucket
- ✓ Provide instructions for how to run and test your code in a README.md file. Assume I am using an M1 MacBook Pro, Docker is already installed, and I will be launching your code from the command line.