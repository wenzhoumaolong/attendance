const { errors, permissions } = require('../const.js');
var is = require('is_js');


module.exports = app => {
	return class EmployeeService extends app.Service {
		* find(id) {
			const employee = yield app.mysql.get('employee', { id });
			return employee;
		}

		* checkAccount(phone, password) {
			const employee = yield app.mysql.get('employee', { phone, password });
			if (! is.object(employee)) throw new Error(errors.INVALID_ACCOUNT_OR_PARSWORD.code);
			yield this.ctx.service.permission.checkPermisson(employee.roleId, permissions.LOGIN_PERMISSSON);
			return true;
		}
	}
}