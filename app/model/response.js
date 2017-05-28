const is = require('is_js');

class Transfer {
	constructor(code = 200, data = {}, message = '') {
		if (is.object(code)) {
			message = code.message;
			code = code.code;
		}

		this.code = code;
		this.data = data;
		this.message = message;
	}
}

module.exports = Transfer;
