const createRule = {
  wharehouseName: { type: 'string' },
  wharehouseAddress: { type: 'string' },
  wharehouseAccount: { type: 'string' },
  wharehousePassword: { type: 'string' },
  wharehouseTelphone: { type: 'string' },
};

module.exports = app  => {
	return class WharehouseController extends app.Controller {
		// --Path /wharehouse
		* index() {

		}

		// --Path /wharehouse/new
		* new() {

		}

		// --Path /wharehouse/:id
		* show() {
			const { ctx, service } = this;
			const wharehouse = yield service.wharehouse.find(this.ctx.params.id);
			this.ctx.body = wharehouse;
		}

		// --Path /wharehouse/:id/edit
		* edit() {

		}

		// --Path /wharehouse
		* create() {
			const { cxt, service } = this;
			cxt.validate(createRule);
			const result = yield service.wharehouse.update(ctx.body)
			this.body = { result };
		}

		// --Path /wharehouse/:id
		* update() {

		}

		// --Path /wharehouse/:id
		* destroy() {

		}
	}
}