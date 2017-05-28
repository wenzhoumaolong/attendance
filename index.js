// npm run dev:server DO NOT read this file
const os = require('os')

require('egg').startCluster({
  baseDir: __dirname,
  port: 7001, // default to 7001
  workers: process.env.NODE_ENV === 'development' ? 1 : os.cpus().length
});
