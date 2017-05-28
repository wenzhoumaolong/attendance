const { permissions } = require('../const');
const Transfer = require('../model/response');
const { INVALID_ACCOUNT_OR_PASSWORD, NO_PERMISSION } = require('../error')

module.exports = app  => {
	return class LoginController extends app.Controller {
		* login() {
			const { request, service } = this.ctx;
			const { phone, password } = request.body;

			if (!phone || !password) {
				this.ctx.body = new Transfer(INVALID_ACCOUNT_OR_PASSWORD);
				return;
			}

			const employee = yield service.employee.checkAccount(phone, password);

			if (employee) {
				const hasPermission = yield service.permission.checkPermission(phone, permissions.LOGIN_PERMISSSON);
				if (hasPermission) {
					this.ctx.session.userId = employee.phone;
					this.ctx.body = new Transfer(200, { name: employee.name });
					return;
				} else {
					this.ctx.body = new Transfer(NO_PERMISSION);
					return;
				}
			}
			this.ctx.body = new Transfer(INVALID_ACCOUNT_OR_PASSWORD);
		}

		* logout() {
			this.ctx.session.userId = null;
			this.ctx.body = { success: true };
		}
	}
}
