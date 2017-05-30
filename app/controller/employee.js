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
			this.ctx.body = 111;
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
			const { ctx, service, config } = this;
			ctx.validate(createRule);
			const userId = this.ctx.session.userId;
			const existEmployee = yield ctx.service.employee.findByPhone(ctx.request.body.phone);
			if (existEmployee) {
				this.ctx.body = new Transfer(EXIST_PHONE);
				return;
			}
			const { warehouseId } = yield ctx.service.employee.findByPhone(userId);
			const { name, phone, roleId } = ctx.request.body;
			const id = yield ctx.service.employee.create({ name, phone, roleId, warehouseId, password: config.defaultPassword });
			this.ctx.body = new Transfer(200, { id });
		}

		// --Path /employee/:id Method --PUT
		* update() {
			const { ctx, service } = this;
			ctx.validate(createRule);
			const existEmployee = yield ctx.service.employee.findByPhone(ctx.request.body.phone);
			console.log(ctx.params.id);
			if (existEmployee && existEmployee.id !== parseInt(ctx.params.id)) {
				this.ctx.body = new Transfer(EXIST_PHONE);
				return;
			}
			const { name, phone, roleId } = ctx.request.body;
			yield ctx.service.employee.update({ id: ctx.params.id, name, phone, roleId });
			this.ctx.body = new Transfer();
		}

		// --Path /employee/:id Method --DELETE
		* destroy() {

		}
	}
}
