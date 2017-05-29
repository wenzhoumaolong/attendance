const createRule = {
  name: { type: 'string' },
  address: { type: 'string' },
  telphone: { type: 'string' },
};
const Transfer = require('../model/response');

module.exports = app  => {
	return class warehouseController extends app.Controller {
		// --Path /warehouse Method --GET
		* index() {
			const userId = this.ctx.session.userId;
			const { ctx, service } = this;
			const warehouse = yield service.warehouse.findByUserId(userId);
			this.ctx.body = new Transfer(200, warehouse);
		}

		// --Path /warehouse/filter Method --POST
		* filter() {
			const { ctx, service } = this;
			const { name, address, telphone } = ctx.request.body;
			const result = yield service.warehouse.filter(name, address, telphone);
			this.ctx.body = new Transfer(200, result);
		}

		// --Path /warehouse/new Method --GET
		* new() {

		}

		// --Path /warehouse/:id Method --GET
		* show() {
			const { ctx, service } = this;
			const warehouses = yield service.warehouse.find(this.ctx.params.id);
			this.ctx.body = new Transfer(200, warehouses);
		}

		// --Path /warehouse/:id/edit Method --GET
		* edit() {
			this.ctx.body = 111;
		}

		// --Path /warehouse Method --POST
		* create() {
			const { ctx, service } = this;
			ctx.validate(createRule);
			const id = yield service.warehouse.create(ctx.request.body);
			this.ctx.body = new Transfer(200, { id });
		}

		// --Path /warehouse/:id Method --PUT
		* update() {
			const { ctx, service, params } = this;
			ctx.validate(createRule);
			var warehouse = Object.assign({}, ctx.request.body, { id: ctx.params.id, updateDate: new Date() });
			yield service.warehouse.update(warehouse);
			this.ctx.body = new Transfer();
		}

		// --Path /warehouse/:id Method --DELETE
		* destroy() {

		}
	}
}