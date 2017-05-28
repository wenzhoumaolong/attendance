module.exports = app  => {
	return class LoginController extends app.Controller {
		* login() {
			const { request, service } = this.ctx;
			const { phone, password } = request.body;
			const transfer = yield service.employee.checkAccount(phone, password);
			this.ctx.body = transfer;
		}

		* logout() {
			this.ctx.session.userId = null;
			this.ctx.body = { success: true };
		}
	}
}
