const createRule = {
  name: { type: 'string' },
  address: { type: 'string' },
  telphone: { type: 'string' },
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
			this.ctx.body = 111;
		}

		// --Path /warehouse Method --POST
		* create() {
			const { ctx, service } = this;
			ctx.validate(createRule);
			const id = yield service.warehouse.create(ctx.request.body);
			this.ctx.body = { id };
		}

		// --Path /warehouse/:id Method --PUT
		* update() {
			const { ctx, service, params } = this;
			ctx.validate(createRule);
			var warehouse = Object.assign({}, ctx.request.body, { id: ctx.params.id, updateDate: new Date() });
			yield service.warehouse.update(warehouse);
			this.ctx.body = { success: true };
		}

		// --Path /warehouse/:id Method --DELETE
		* destroy() {

		}
	}
}