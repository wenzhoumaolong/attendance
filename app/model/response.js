const is = require('is_js');
const moment = require('moment');

class Transfer {
	constructor(code = 200, data = {}, message = '') {
		if (is.object(code)) {
			message = code.message;
			code = code.code;
		}

		this.code = code;
		this.data = data;
		this.message = message;
		this.responseDateTime = 'server response time: ' + moment().format('YYYY-MM-DD HH:mm:ss SSS');
	}
}

module.exports = Transfer;
