const { errors } = require('../const.js');

module.exports = () => {
	return function* sessionValidation(next) {
		if (! this.session.userId) throw new Error(errors.NOT_LOGIN.code);
		yield next;
	}
}