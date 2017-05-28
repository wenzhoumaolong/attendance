module.exports = app => {
	return class WarehouseService extends app.Service {
		* find(id) {
			const warehouse = yield app.mysql.get('warehouse', { id });
			return warehouse;
		}

		* update(warehouse) {
			const result = yield app.mysql.update('warehouse', warehouse);
			return result.affectedRows === 1;
		}

		* create(warehouse) {
			const result = yield app.mysql.insert('warehouse', warehouse);
			return result.insertId;
		}
	}
}