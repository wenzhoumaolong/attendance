const createRule = {
  name: { type: 'string' },
  phone: { type: 'string' },
  roleId: { type: 'int' },
};
const Transfer = require('../model/response');
const { EXIST_PHONE } = require('../error');

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
			const userId = this.ctx.session.userId;
			const employee = yield this.ctx.service.employee.find(this.ctx.params.id, userId);
			this.ctx.body = new Transfer(200, employee);
		}

		// --Path /employee/:id/edit Method --GET
		* edit() {

		}

		// --Path /employee Method --POST
		* create() {
			const { ctx, service } = this;
			ctx.validate(createRule);
			// const userId = this.ctx.session.userId;
			const userId = '18801615551';
			const existEmployee = yield ctx.service.employee.findByPhone(ctx.request.body.phone);
			if (existEmployee) {
				this.ctx.body = new Transfer(EXIST_PHONE);
				return;
			}
			const { warehouseId } = yield ctx.service.employee.findByPhone(userId);
			const newEmployee = Object.assign({}, ctx.request.body, { warehouseId });
			const id = yield ctx.service.employee.create(newEmployee);
			this.ctx.body = new Transfer(200, { id });
		}

		// --Path /employee/:id Method --PUT
		* update() {

		}

		// --Path /employee/:id Method --DELETE
		* destroy() {

		}
	}
}