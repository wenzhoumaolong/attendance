const oauth = require('../utils/wechat_oauth_util');

module.exports = app  => {
	return class WechatController extends app.Controller {
		* get() {
			// console.log(this.ctx.query);
			// 接口配置信息，微信调用验证token，返回echostr
			this.ctx.body = this.ctx.query.echostr;
			return;
		}

		* getOauthSuccess() {
			const { request, service } = this.ctx;
			console.log('22222222222');
			console.log(this.ctx.query);
			const { code } = this.ctx.query;
			const callBack = (err, result) => {
				console.log('33333333');
				console.log(result);
				console.log('444444444');
				console.log(err);
			}
			yield service.wechatoauth.getOauthSuccess(code, callBack);
			this.ctx.body = 'success';
			return;
		}

		* getOauthPage() {
			const { request, service } = this.ctx;
			const url = yield service.wechatoauth.getAuthorizeURL(1);
			this.ctx.body = url;
			return;
		}
	}
}
