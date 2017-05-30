const Transfer = require('../model/response');

module.exports = app => {
	return class EmployeeService extends app.Service {
		* find(id, userId) {
			const employee = yield app.mysql.query('SELECT e.`id`, e.`name`, e.`phone`, e.`warehouseId`, e.`RFID`, e.`createDate`, e.`updateDate` '+
																							'FROM `employee` ' +
																							'INNER JOIN `employee` e ' +
																							'ON employee.phone = ? AND e.warehouseId = employee.id ' +
																							'WHERE e.id = ?', [userId, id]);
			if (employee && employee.length > 0) {
				return employee[0];
			}

			return {};
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

		* findByPhone(phone) {
			const employee = yield app.mysql.get('employee', { phone });
			return employee;
		}

		* create(employee) {
			const result = yield app.mysql.insert('employee', employee);
			return result.insertId;
		}

		* update(employee) {
			const result = yield app.mysql.update('employee', employee);
			return result.affectedRows === 1;
		}
	}
}
