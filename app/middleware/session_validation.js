const { NOT_LOGIN } = require('../error');
const Transfer = require('../model/response');
const moment = require('moment');

module.exports = () => {
	return function* sessionValidation(next) {
		const { token } = this.request.header;
		if (token) {
			var decrypted = undefined;
			try {
				decrypted = this.helper.decrypt(token, this.app.config.secret);
			} catch (err) {
			}
			if (decrypted) {
				const { username, signedTime } = JSON.parse(decrypted);
				if (username) {
					var signed = moment(signedTime);
					signed = signed.add(2, 'd');
					if (signed > moment()) {
						this.request.header.token = username;
						yield next;
						return;
					}
				}
			}
		}	
		
		this.body = new Transfer(NOT_LOGIN);
		return;
	}
}
