const { permissions, permissionCheckRoles } = require('../const.js');
const is = require('is_js');

module.exports = () => {
	return function* permissionCheck(next) {
		const userId = this.session.userId;
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
		
		if (is.array(checkRoles) && checkRoles.length > 0) {
			// yield can not used in foreach function.
			for (var i = 0; i < checkRoles.length; i++) {
				var role = checkRoles[i];
				yield this.service.permission.checkPermission(userId, permissions[role.permission]);
			}
		}
		yield next;
	}
}