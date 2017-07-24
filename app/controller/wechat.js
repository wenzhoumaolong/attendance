const oauth = require('../service/wechatoauth');

module.exports = app  => {
	return class WechatController extends app.Controller {
		* get() {
			this.ctx.body = oauth.url;
			return;
		}
	}
}
