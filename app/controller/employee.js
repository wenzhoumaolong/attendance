module.exports = app  => {
	return class EmployeeController extends app.Controller {
		// --Path /employee Method --GET
		* index() {
			this.ctx = 111;
		}

		// --Path /employee/new Method --GET
		* new() {
			this.ctx = 111;
		}

		// --Path /employee/:id Method --GET
		* show() {
			const employee = yield this.ctx.service.employee.find(this.ctx.params.id);
			this.ctx.body = employee;
		}

		// --Path /employee/:id/edit Method --GET
		* edit() {

		}

		// --Path /employee Method --POST
		* create() {
			this.ctx = 111;
		}

		// --Path /employee/:id Method --PUT
		* update() {

		}

		// --Path /employee/:id Method --DELETE
		* destroy() {

		}
	}
}