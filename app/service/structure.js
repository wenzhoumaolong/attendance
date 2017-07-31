module.exports = app => {
	return class StructureService extends app.Service {
		* addGrade(gradeName) {
			const result = yield app.mysql.insert('grade', { displayName: gradeName });
			return result.insertId;
		}

		* delGrade(id) {
			const result = yield app.mysql.delete('grade', { id });
			return result.affectedRows === 1;
		}

		* addClass(gradeId, className) {
			const result = yield app.mysql.insert('class', { gradeId, displayName: className });
			return result.insertId;
		}

		* delClass(id) {
			const result = yield app.mysql.delete('class', { id });
			return result.affectedRows === 1;
		}
	}
}
