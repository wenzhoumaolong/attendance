const os = require('os');
const config = require('./config/config.json');

require('egg').startCluster({
  baseDir: __dirname,
  port: config.port
});
