// npm run dev:server DO NOT read this file
require('egg').startCluster({
  baseDir: __dirname,
  port: process.env.PORT || 8080, // default to 7001
});
