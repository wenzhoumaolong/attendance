const Transfer = require('../model/response');

module.exports = app => {
	return class PermissionController extends app.Controller {
		* get() {
			const { service } = this.ctx;
			const uerId = this.session.userId;
			const permissions = yield service.permission.getPermissions(userId);
			this.ctx.body = new Transfer(200, permissions);
		}
	}
}
