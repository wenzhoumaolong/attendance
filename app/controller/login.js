const { permissions } = require('../const');
const Transfer = require('../model/response');
const moment = require('moment');
const { INVALID_ACCOUNT_OR_PASSWORD, NO_PERMISSION, INVALID_OLD_PASSWORD } = require('../error');

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
					const token = this.ctx.helper.encrypt(
						JSON.stringify({username, signedTime: this.ctx.helper.nowStr()}),
						this.config.secret);
					this.ctx.body = new Transfer(200, { token });
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

		* changePassword() {
			const { service, request } = this.ctx;
			const { oldPassword, newPassword } = request.body;
			const username = request.header.token;
			const admin = yield service.admin.checkAccount(username, oldPassword);
			if (!admin) {
				this.ctx.body = new Transfer(INVALID_OLD_PASSWORD);
				return;
			}
			admin.password = newPassword;
			yield service.admin.changePassword(admin);
			this.ctx.body = new Transfer();
			return;
		}
	}
}
