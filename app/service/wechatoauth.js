const urlencode = require('urlencode');

module.exports = app => {
  return class WechatOauthService extends app.Service {  
    * getAuthorizeUrl(state) {
      const { webchatJSDomain, wechatAppId, wechatAppsecret } = app.config;
      const url = urlencode(`${webchatJSDomain}/oauth`);
      return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechatAppId}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
    }

    * getAccessToken(code) {
      const { wechatAppId, wechatAppsecret } = app.config;
      const result = yield app.curl(
        `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wechatAppId}&secret=${wechatAppsecret}&code=${code}&grant_type=authorization_code`,
        { 
          method: 'GET',
          dataType: 'json'
        });
      return result.data;
    }

    * getWechatUserInfo(openId, access_token) {
      const result = yield app.curl(
        `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openId}&lang=zh_CN`,
        { 
          method: 'GET',
          dataType: 'json'
        });
      
      return result.data;
    }
  }
}
