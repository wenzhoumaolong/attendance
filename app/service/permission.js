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
			return mapping && mapping.length > 0;
		}

		/*
		SELECT permission.*  
		FROM `employee`
			INNER JOIN `role_permission_mapping` map
				ON employee.phone = '18801615551' AND employee.roleId = map.roleId
			INNER JOIN `permission`
				ON permission.id = map.permissionId;
		*/
		* getPermissions(userId) {
			const permissions = yield app.mysql.query(
				'SELECT permission.*  ' +
				'FROM `employee` ' +
					'INNER JOIN `role_permission_mapping` map ' +
					'ON employee.phone = ? AND employee.roleId = map.roleId ' +
				'INNER JOIN `permission` ' +
				'ON permission.id = map.permissionId', [userId]);
			return permissions;
		}
	}
}
