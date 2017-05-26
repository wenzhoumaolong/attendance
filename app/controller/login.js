module.exports = app  => {
	return class LoginController extends app.Controller {
		* login() {
			const { request, service, params } = this.ctx;
			yield service.employee.checkAccount(request.body.phone, request.body.password);
			this.ctx.session.userId = request.body.phone;
			this.ctx.body = { success: true };
		}

		* logout() {
			this.ctx.session.userId = null;
			this.ctx.body = { success: true };
		}
	}
}