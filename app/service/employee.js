const Transfer = require('../model/response');
const { DELETE_FAILED } = require('../error');

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

		* queryEmployees(name, gradeId, classId, phone, page, pageSize) {
			var queryStr = 'SELECT employee.id, name, phone, gradeId, classId FROM `employee` ' +
												` WHERE name LIKE '%${name}%'`;

			var countStr = 'SELECT COUNT(id) AS totalCount FROM `employee` ' +
											`WHERE name LIKE '%${name}%'`;
			if (gradeId) {
				queryStr += ` AND gradeId = ${gradeId} `;
				countStr += ` AND gradeId = ${gradeId} `;
			}

			if (classId) {
				queryStr += ` AND classId = ${classId} `;
				countStr += ` AND classId = ${classId} `;
			}

			if (phone) {
				queryStr += ` AND phone = '%${phone}%'`;
				countStr += ` AND phone = '%${phone}%'`;
			}

			queryStr += ` LIMIT ${(page - 1) * pageSize}, ${pageSize} `;

			const employees = yield app.mysql.query(queryStr);
			const result = yield app.mysql.query(countStr);
			return { list: employees, totalCount: result[0].totalCount };
		}

		* findByRFID(identity) {
			const employee = app.mysql.get('employee', { RFID: identity });
			return employee;
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

		* findById(id) {
			const employee = yield app.mysql.get('employee', { id });
			const observer = yield app.mysql.select('wechat_information', 
				{
					where: { employeeId: id }
				});
			return Object.assign({}, employee, { observer: observer ? observer : [] });
		}

		* create(employee) {
			const result = yield app.mysql.insert('employee', employee);
			const oauthUrl = yield this.service.wechatoauth.getAuthorizeUrl(result.insertId);
			this.ctx.helper.generateQRImage(result.insertId, oauthUrl);
			return result.insertId;
		}

		* update(employee) {
			const result = yield app.mysql.update('employee', employee);
			return result.affectedRows === 1;
		}

		* delete(id) {
			const conn = yield app.mysql.beginTransaction();
			try {
				yield conn.delete('attendance_record', { employeeId: id });
				yield conn.delete('wechat_information', { employeeId: id });
				yield conn.delete('employee', { id });
			  yield conn.commit();
			} catch (err) {
			  // error, rollback
			  yield conn.rollback();
			  return { success: false, error: DELETE_FAILED };
			}
			this.ctx.helper.deleteQRImage(id);
			return { success: true };
		}
	}
}
