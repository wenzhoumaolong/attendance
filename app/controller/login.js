module.exports = app  => {
	return class LoginController extends app.Controller {
		* login() {
			const { request, service, params } = this.ctx;
			yield service.employee.checkAccount(request.body.phone, request.body.password);
			this.ctx.body = { success: true };
		}
	}
}