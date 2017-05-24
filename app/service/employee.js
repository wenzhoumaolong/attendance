module.exports = app => {
	return class EmployeeService extends app.Service {
		* find(id) {
			const employee = yield app.mysql.get('employee', { id });
			return employee;
		}
	}
}