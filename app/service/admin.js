const Transfer = require('../model/response');

module.exports = app => {
	return class AdminService extends app.Service {

		* checkAccount(username, password) {
			return yield app.mysql.get('admin', { username, password });
		}
	}
}
