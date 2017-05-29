const Transfer = require('../model/response');

module.exports = app => {
	return class EmployeeService extends app.Service {
		* find(id) {
			return yield app.mysql.get('employee', { id });
		}

		* checkAccount(phone, password) {
			return yield app.mysql.get('employee', { phone, password });
		}

		* checkWarehouseEmployee(warehouseId) {
			const result = yield app.mysql.select('employee', {
				where: { warehouseId },
				limit: 1,
				offset: 0
			});
			return result && result.length === 1;
		}
	}
}
