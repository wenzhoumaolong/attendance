const path = require('path');

module.exports = appInfo => {
  return {
    // Disable security precautions 
    security: {
      xframe: {
        enable: false,
      },
      csrf: {
        enable: false,
      },
      domainWhiteList: ['http://localhost:9000', ''],
    },
bodyParser: {
        enableTypes:['json','form','text'],
        extendTypes: {
        text: ['text/xml'] 
      }
    },

    keys: appInfo.name + '1495344987775',
secret: '123',

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
    defaultPassword: '111111',
    webchatJSDomain: 'http://wmaolong.cn/wzml',
    wechatAppId: 'wx84ac462304bb229e',
    wechatAppsecret: '64fef03efc3247143a4b404d753f236f',
	alSMSAppKey: '24568404',
    alSMSappsecret: '30526427fb08debb1a5943558483921b',
    alSMSREST_URL: 'http://gw.api.taobao.com/router/rest',
    alSMSSignName: '校园管理系统',
    alSMSTemplateCodeIn: 'SMS_80485030',
    alSMSTemplateCodeOut: 'SMS_80425027',

    mysql: {
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'root',
        // 数据库名
        database: 'attendance',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    middleware: [ 'errorHandler', 'sessionValidation'],

    errorHandler: {
      // 非 `/api/` 路径不在这里做错误处理，留给默认的 onerror 插件统一处理
      match: '/api',
    },
    sessionValidation: {
	ignore: ['/api/login', '/api/rfid', '/api/wechat', '/api/employee']
    },
    // permissionCheck: {
    //   // 非 `/api/` 路径不在这里做错误处理，留给默认的 onerror 插件统一处理
    //   match: '/api',
    // },
  }
};
