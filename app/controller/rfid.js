const Transfer = require('../model/response');
const { INVALID_IDENTITY } = require('../error');

module.exports = app  => {
	return class RfidController extends app.Controller {
		* create() {
			const { service, query } = this.ctx;
			const { identity } = query;
			if (!identity) {
				this.ctx.body = new Transfer(INVALID_IDENTITY);
				return;
			}
			this.ctx.logger.info(identity);
			const result = yield service.rfid.saveIdentity(identity.toLowerCase());
			if (result.success == true) {
				this.ctx.body = new Transfer();
			} else {
				this.ctx.body = new Transfer(result.error);
			}
			return;
		}

		* get() {
			const { service } = this.ctx;
			const result = yield service.rfid.getNewestRfid();
			if (result.success) {
				this.ctx.body = new Transfer(200, { identity: result.identity });
			} else {
				this.ctx.body = new Transfer(result.error);
			}
			return;
		}
	}
}
