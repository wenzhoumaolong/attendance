const Transfer = require('../model/response');

module.exports = app => {
	return class EmployeeService extends app.Service {
		* find(id) {
			return yield app.mysql.get('employee', { id });
		}

		* checkAccount(phone, password) {
			return yield app.mysql.get('employee', { phone, password });
		}
	}
}
