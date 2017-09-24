module.exports = app => {
	return class RecordService extends app.Service {
		* getRecords(startDate, endDate, name, gradeId, classId, phone, page, pageSize) {
			var queryStr = "SELECT employee.name, " +
												"employee.phone, " +
				    						"case record.recordType WHEN 'OUT' THEN '出' " +
													"WHEN 'IN' THEN '进'  END AS type, " +
				    						"record.createDate, " +
				    						"classId, " +
				    						"gradeId " +
												"FROM `attendance_record` record " +
												"LEFT JOIN `employee` ON record.employeeId = employee.id ";
			var countStr = "SELECT count(record.id) AS totalCount " +
												"FROM `attendance_record` record " +
												"LEFT JOIN `employee` ON record.employeeId = employee.id ";
			if (startDate) {
				queryStr += ` AND record.createDate > '${startDate}' `;
				countStr += ` AND record.createDate > '${startDate}' `;
			}
			if (endDate) {
				queryStr += ` AND record.createDate < '${endDate}' `;
				countStr += ` AND record.createDate < '${endDate}' `;
			}
			if (name) {
				queryStr += ` AND employee.name LIKE '%${name}%' `;
				countStr += ` AND employee.name LIKE '%${name}%' `;
			}
			if (phone) {
				queryStr += ` AND employee.phone LIKE '%${phone}%' `;
				countStr += ` AND employee.phone LIKE '%${phone}%' `;
			}
			if (gradeId) {
				queryStr += ` AND gradeId = ${gradeId} `;
				countStr += ` AND gradeId = ${gradeId} `;
			}
			if (classId) {
				queryStr += ` AND classId = ${classId} `;
				countStr += ` AND classId = ${classId} `;
			}

			queryStr += ` ORDER BY record.id desc LIMIT ${(page - 1) * pageSize}, ${pageSize} `;
			const records = yield app.mysql.query(queryStr);
			const result = yield app.mysql.query(countStr);

			return { list: records, totalCount: result[0].totalCount };
		}

		* hasSentMessage(employeeId, startDate, endDate) {
		  const queryStr = 'SELECT id FROM `attendance_record` ' +  `WHERE createDate > '${startDate}' AND createDate < '${endDate}' AND employeeId = '${employeeId}' LIMIT 0, 1;`;
      const result = yield app.mysql.query(queryStr);
      return result && result.length >= 1;
    }
	}
}
