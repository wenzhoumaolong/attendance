const { errors } = require('../const.js');
var is = require('is_js');

module.exports = app => {
	return class PermissionService extends app.Service {
		* checkPermisson(roleId, permissionId) {
			const mapping = yield app.mysql.get('role_permission_mapping', { roleId, permissionId });
			if (! is.object(mapping)) throw new Error(errors.NO_PERMISSION.code);
			return true;
		}
	}
}
