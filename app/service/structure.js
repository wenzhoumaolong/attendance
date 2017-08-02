const { DELETE_FAILED } = require('../error');

module.exports = app => {
	return class StructureService extends app.Service {
		* addGrade(gradeName) {
			const result = yield app.mysql.insert('grade', { displayName: gradeName });
			return result.insertId;
		}

		* delGrade(id) {
			const conn = yield app.mysql.beginTransaction();
			const employeeIds = [];
			try {
				const result = yield conn.select('employee', { 
					where: { gradeId: id },
					columns: ['id']
				});
				if (employeeIds.length > 0) {
					yield conn.delete('attendance_record', { employeeId: employeeIds });
					yield conn.delete('wechat_information', { employeeId: employeeIds });
					yield conn.delete('employee', { id: employeeIds });
				}
				yield conn.delete('class', { gradeId: id });
				yield conn.delete('grade', { id });
			} catch (err) {
			  // error, rollback
			  yield conn.rollback();
			  return { success: false, error: DELETE_FAILED };
			}
			employeeIds.map((id) => {
				this.ctx.helper.deleteQRImage(id);
			});
			return {success: true};
		}

		* addClass(gradeId, className) {
			const result = yield app.mysql.insert('class', { gradeId, displayName: className });
			return result.insertId;
		}

		* delClass(id) {
			const conn = yield app.mysql.beginTransaction();
			const employeeIds = [];
			try {
				const result = yield conn.select('employee', { 
					where: { classId: id },
					columns: ['id']
				});
				result.map((item) => {
					employeeIds.push(item.id);
				});
				if (employeeIds.length > 0) {
					yield conn.delete('attendance_record', { employeeId: employeeIds });
					yield conn.delete('wechat_information', { employeeId: employeeIds });
					yield conn.delete('employee', { id: employeeIds });
				}
				yield conn.delete('class', { id });
			  yield conn.commit();
			} catch (err) {
			  // error, rollback
			  yield conn.rollback();
			  return { success: false, error: DELETE_FAILED };
			}
			employeeIds.map((id) => {
				this.ctx.helper.deleteQRImage(id);
			});
			return { success: true };
		}
	}
}
