const Transfer = require('../model/Response');
const { permissions } = require('../const');
const { INVALID_ACCOUNT_OR_PASSWORD, NO_PERMISSION } = require('../error')

module.exports = app => {
	return class EmployeeService extends app.Service {
		* find(id) {
			return yield app.mysql.get('employee', { id });
		}

		* checkAccount(phone, password) {
		  if (!phone || !password) {
        return new Transfer(INVALID_ACCOUNT_OR_PASSWORD);
      }
			const employee = yield app.mysql.get('employee', { phone, password });
			if (employee) {
        const hasPermission = yield this.ctx.service.permission.checkPermission(employee.roleId, permissions.LOGIN_PERMISSSON);
        if (hasPermission) {
          this.ctx.session.user = employee;
          return new Transfer(200, { name: employee.name });
        } else {
          return new Transfer(NO_PERMISSION);
        }
      } else {
        return new Transfer(INVALID_ACCOUNT_OR_PASSWORD);
      }
		}
	}
}
