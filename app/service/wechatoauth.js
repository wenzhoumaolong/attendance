const { getClient } = require('../utils/wechat_oauth_util');

module.exports = app => {
  return class WechatOauthService extends app.Service {  
    * getAuthorizeUrl(state) {
      return getClient(app).getAuthorizeURL('http://118.190.175.30/api/wechat/oauth', state, 'snsapi_base')
    }

    * getOauthSuccess(code, callback) {
      var client = getClient(app);
      client.getAccessToken(code, callback);
    }

    * getAccessToken(code, callback) {

    }
  }
}
