const path = require('path');

module.exports = appInfo => {
  return {
    keys: appInfo.name + '1495344987775',

    static: {
      prefix: '/',
      dir: path.join(appInfo.baseDir, 'dist/'),
    },

    view: {
      mapping: {
        '.pug': 'pug'
      }
    },

    /**
     * git: https://github.com/chrisyip/egg-view-pug
     * @property {String} [basedir='${baseDir}/app/view'] - the root directory of pug files
     * @property {Boolean} [cache=true] - compiled functions are cached, only work with `ctx.render`
     * @property {Boolean} [debug=false] - output generated function body
     * @property {Boolean} [compileDebug=true] - when false no debug instrumentation is compiled
     */
    pug: {
      basedir: path.join(appInfo.baseDir, 'app/view'),
      cache: true,
      debug: false,
      compileDebug: true
    },

    mysql: {
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'abc123_',
        // 数据库名
        database: 'attendance',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    }
  }
};
