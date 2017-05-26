const createRule = {
  warehouseName: { type: 'string' },
  warehouseAddress: { type: 'string' },
  warehouseAccount: { type: 'string' },
  warehousePassword: { type: 'string' },
  warehouseTelphone: { type: 'string' },
};

module.exports = app  => {
	return class warehouseController extends app.Controller {
		// --Path /warehouse Method --GET
		* index() {

		}

		// --Path /warehouse/new Method --GET
		* new() {

		}

		// --Path /warehouse/:id Method --GET
		* show() {
			const { ctx, service } = this;
			const warehouse = yield service.warehouse.find(this.ctx.params.id);
			this.ctx.body = warehouse;
		}

		// --Path /warehouse/:id/edit Method --GET
		* edit() {

		}

		// --Path /warehouse Method --POST
		* create() {
			const { cxt, service } = this;
			cxt.validate(createRule);
			const result = yield service.warehouse.update(ctx.body)
			this.body = { result };
		}

		// --Path /warehouse/:id Method --PUT
		* update() {
			const { ctx, service } = this;
			const warehouse = yield service.warehouse.find(this.ctx.params.id);
			this.ctx.body = warehouse;
		}

		// --Path /warehouse/:id Method --DELETE
		* destroy() {

		}
	}
}