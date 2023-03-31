const {PORT} = require('config');
console.log({PORT})
const logger = console;

const app = require('./app')();

const server = app.listen(PORT, function() {
    logger.info('Express server listening on port ' + server.address().port);
});

