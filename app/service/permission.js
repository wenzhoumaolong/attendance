const { errors } = require('../const.js');
const is = require('is_js');
const { createError } = require('../utils/error_util.js');

module.exports = app => {
	return class PermissionService extends app.Service {
		/*
		SELECT role_permission_mapping.id 
		FROM `employee`
			INNER JOIN `role_permission_mapping`
			ON employee.phone = '18801615551' AND employee.roleId = role_permission_mapping.roleId
		WHERE role_permission_mapping.permissionid = 2;
		*/
		* checkPermission(userId, permissionId) {
			const mapping = yield app.mysql.query(
				'SELECT role_permission_mapping.id FROM `employee`' + 
				'INNER JOIN `role_permission_mapping`' + 
					'ON employee.phone = ? AND employee.roleId = role_permission_mapping.roleId ' +
				'WHERE role_permission_mapping.permissionid = ?', [userId, permissionId]);
			if (is.undefined(mapping) || mapping.length <= 0) throw createError(errors.NO_PERMISSION);
			return true;
		}
	}
}
