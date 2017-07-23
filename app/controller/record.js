const Transfer = require('../model/response');

module.exports = app  => {
	return class RecordController extends app.Controller {
		* queryRecords() {
			const { request, service } = this.ctx;
			const { startDate, endDate, name, gradeId, classId, phone ,page, pageSize } = request.body;
			const result = yield service.record.getRecords(startDate, endDate, name, gradeId, classId, phone, page, pageSize);
			this.ctx.body = new Transfer(200, result);
			return;
		}
	}
}
