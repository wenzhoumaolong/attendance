const { NOT_LOGIN } = require('../error');
const Transfer = require('../model/response');

module.exports = () => {
	return function* sessionValidation(next) {
		console.log(this.ctx);
		if (! this.session.userId) {
			this.body = new Transfer(NOT_LOGIN);
			return;
		}
		yield next;
	}
}
