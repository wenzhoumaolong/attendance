module.exports = app  => {
	return class EmployeeController extends app.Controller {
		// --Path /employee
		* index() {

		}

		// --Path /employee/new
		* new() {

		}

		// --Path /employee/:id
		* show() {
			const employee = yield this.ctx.service.employee.find(this.ctx.params.id);
			this.ctx.body = employee;
		}

		// --Path /employee/:id/edit
		* edit() {

		}

		// --Path /employee
		* create() {

		}

		// --Path /employee/:id
		* update() {

		}

		// --Path /employee/:id
		* destroy() {

		}
	}
}