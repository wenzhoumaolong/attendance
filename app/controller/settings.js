const Transfer = require('../model/response');

module.exports = app  => {
	return class SettingsController extends app.Controller {
		* getGrade() {
			this.ctx.body = new Transfer(200, yield app.mysql.select('grade'));
			return;
		}

		* getClasses() {
			this.ctx.body = new Transfer(200, yield app.mysql.select('class'));
			return;
		}
	}
}
