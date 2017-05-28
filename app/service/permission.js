module.exports = app => {
	return class PermissionService extends app.Service {
		* checkPermission(roleId, permissionId) {
			const mapping = yield app.mysql.get('role_permission_mapping', { roleId, permissionId });
			return !!mapping;
		}
	}
}
