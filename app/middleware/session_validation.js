const { NOT_LOGIN } = require('../error');
const Transfer = require('../model/response');

module.exports = () => {
	return function* sessionValidation(next) {
		const decrypted = this.helper.decrypt(this.request.header.token, this.app.config.secret);
		if (decrypted) {
			const { username, signedTime } = JSON.parse(decrypted);
			if (username) {
				yield next;
				return;
			}
		}
		
		this.body = new Transfer(NOT_LOGIN);
		return;
	}
}
