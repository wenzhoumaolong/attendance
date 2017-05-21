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
    }
  }
};
