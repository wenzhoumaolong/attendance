const Transfer = require('../model/response');
const { WECHAT_GETINFO_ERROR } = require('../error');

module.exports = app  => {
	return class WechatController extends app.Controller {
		* get() {
			// console.log(this.ctx.query);
			// 接口配置信息，微信调用验证token，返回echostr
			this.ctx.body = this.ctx.query.echostr;
			return;
		}

		* getOauthInfo() {
			const { service, query } = this.ctx;
			const tokenInfo = yield service.wechatoauth.getAccessToken(query.code);
			if (tokenInfo.errcode) {
				this.ctx.body = new Transfer(WECHAT_GETINFO_ERROR);
				return;
			}
			const { openid, access_token } = tokenInfo;
			const result = yield service.wechatoauth.getWechatUserInfo(openid, access_token);
			if (result.errcode) {
				this.ctx.body = new Transfer(WECHAT_GETINFO_ERROR);
				return;
			}
			this.ctx.body = new Transfer(200, result);
			return;
		}

		* getOauthPage() {
			const { service } = this.ctx;
			const url = yield service.wechatoauth.getAuthorizeUrl(1);
			this.ctx.body = url;
			return;
		}

		* bind() {
			const { service, request } = this.ctx;
			const result = yield service.wechat.bind(request.body);
			this.ctx.body = new Transfer();
			return;
		}

		* sendTemplate() {
			const { service } = this.ctx;
			const result = yield service.wechat.sendTemplate();
			this.ctx.body = 'success';
			return;
		}

		* post() {
			const { service, request } = this.ctx;
			var builder = new xml2js.Builder();  // JSON->xml
  		var parser = new xml2js.Parser();   //xml -> json
  		var jsonObj =  parser.parseString(request.body);
			const responseData = {
				xml:{
					ToUserName: jsonObj.xml.FromUserName,
					FromUserName: jsonObj.xml.ToUserName,
					CreateTime:jsonObj.xml.CreateTime,
					MsgType: 'text',
					Content: '1111111',
					MsgId: jsonObj.xml.MsgId
				}
			}
			this.ctx.body = builder.buildObject(responseData);
			return;
		}
	}
}
