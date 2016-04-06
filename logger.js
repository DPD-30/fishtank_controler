var bunyan = require("bunyan"); // Bunyan dependency
var logger = bunyan.createLogger({name: "tank"});

module.exports = logger;