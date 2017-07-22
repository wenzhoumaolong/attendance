const Transfer = require('../model/response');
const { INVALID_IDENTITY } = require('../error');

module.exports = app  => {
	return class RfidController extends app.Controller {
		* create() {
			const { request, service } = this.ctx;
			const { identity, status } = request.body;

			if (!identity) {
				this.ctx.body = new Transfer(INVALID_IDENTITY);
				return;
			}
			const result = yield service.rfid.saveIdentity(identity, status);
			if (result.success == true) {
				this.ctx.body = new Transfer();
			} else {
				this.ctx.body = new Transfer(result.error);
			}
			return;
		}
	}
}
