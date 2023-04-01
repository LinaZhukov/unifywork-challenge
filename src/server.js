/*
* This file starts the web server and listens on the PORT env variable
* */

const {PORT} = require('config');
const logger = console;

const app = require('./app')();

const server = app.listen(PORT, function() {
    logger.info('Express server listening on port ' + server.address().port);
});
