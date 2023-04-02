/*
* This file starts the web server and listens on the PORT env variable
* */

const {PORT, HOST} = require('config');
const logger = console;

const app = require('./app');

const server = app.listen(PORT, HOST, function() {
    logger.info(`Express server listening on https://${HOST}:${server.address().port}`);
});
