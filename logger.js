const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'tank' });

module.exports = logger;
