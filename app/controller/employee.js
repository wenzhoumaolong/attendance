const createRule = {
  name: { type: 'string' },
  gradeId: { type: 'int' },
  classId: { type: 'int' },
  phone: { type: 'string' }
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
			// const userId = this.ctx.session.userId;
			const employee = yield this.ctx.service.employee.findById(this.ctx.params.id);
			this.ctx.body = new Transfer(200, employee);
		}

		// --Path /employee/:id/edit Method --GET
		* edit() {

		}

		* queryEmployees() {
			const { ctx, service, config } = this;
			const { name, gradeId, classId, phone, page, pageSize } = ctx.request.body;
			const employees = yield ctx.service.employee.queryEmployees(name, gradeId, classId, phone, page, pageSize);
			this.ctx.body = new Transfer(200, employees);
			return;
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
			const { name, phone, gradeId, classId, rfid } = ctx.request.body;
			const id = yield ctx.service.employee.create({ name, phone, gradeId, classId, RFID: rfid });
			this.ctx.body = new Transfer(200, { id });
		}

		// --Path /employee/:id Method --PUT
		* update() {
			const { ctx, service } = this;
			ctx.validate(createRule);
			const existEmployee = yield ctx.service.employee.findByPhone(ctx.request.body.phone);
			if (existEmployee && existEmployee.id !== parseInt(ctx.params.id)) {
				this.ctx.body = new Transfer(EXIST_PHONE);
				return;
			}
			const { name, phone, gradeId, classId, rfid } = ctx.request.body;
			yield ctx.service.employee.update({ id: ctx.params.id, name, phone, gradeId, classId, RFID: rfid });
			this.ctx.body = new Transfer();
			return;
		}

		// --Path /employee/:id Method --DELETE
		* destroy() {
			const { ctx, service } = this;
			const result = yield service.employee.delete(ctx.params.id);
			if (result.success) {
				this.ctx.body = new Transfer();
				return;
			} else {
				this.ctx.body = new Transfer(result.error);
				return;
			}
		}
	}
}
