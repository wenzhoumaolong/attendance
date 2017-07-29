const { permissions } = require('../const');
const Transfer = require('../model/response');
const { INVALID_ACCOUNT_OR_PASSWORD, NO_PERMISSION } = require('../error');

module.exports = app  => {
	return class LoginController extends app.Controller {
		* login() {
			const { request, service } = this.ctx;
			const { username, password } = request.body;

			if (!username || !password) {
				this.ctx.body = new Transfer(INVALID_ACCOUNT_OR_PASSWORD);
				return;
			}

			const admin = yield service.admin.checkAccount(username, password);

			if (admin) {
				// const hasPermission = yield service.permission.checkPermission(phone, permissions.LOGIN_PERMISSSON);
				// if (hasPermission) {
					this.ctx.session.userId = username;
					this.ctx.body = new Transfer(200, { name: username });
					return;
				// } else {
				// 	this.ctx.body = new Transfer(NO_PERMISSION);
				// 	return;
				// }
			}
			this.ctx.body = new Transfer(INVALID_ACCOUNT_OR_PASSWORD);
			return;
		}

		* logout() {
			this.ctx.session.userId = null;
			this.ctx.body = { success: true };
		}
	}
}
