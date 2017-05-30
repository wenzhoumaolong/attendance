const { permissions, permissionCheckRoles } = require('../const');
const Transfer = require('../model/response');
const { NO_PERMISSION } = require('../error')

module.exports = () => {
	return function* permissionCheck(next) {
		const userId = this.session.userId;
		// const userId = '18801615551';
		const checkRoles = permissionCheckRoles.filter((item) => {
			var matchResult = false;
			item.match.map((regStr) => {
				const re = new RegExp(regStr);
				if (re.test(this.url)) {
					matchResult = true;
					return;
				}
			});
			return matchResult && item.methods.indexOf(this.method) >= 0;
		});
		
		if (checkRoles && checkRoles.length > 0) {
			// yield can not used in foreach function.
			for (var i = 0; i < checkRoles.length; i++) {
				var role = checkRoles[i];
				const hasPermission = yield this.service.permission.checkPermission(userId, permissions[role.permission]);
				if (! hasPermission) {
					this.body = new Transfer(NO_PERMISSION);
					return;
				}
			}
		}
		yield next;
	}
}
