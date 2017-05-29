const is = require('is_js');

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

		* filter(name = '', address = '', telphone = '') {
			const { mysql } = app;
			var whereStr = '';
			if (! is.empty(name)) {
				whereStr += 'WHERE `name` LIKE ' + mysql.escape(`%${name}%`);
			}
			if (! is.empty(address)) {
				whereStr = whereStr + (is.empty(whereStr) ? 'WHERE' : 'AND') +
				' `address` LIKE ' + mysql.escape(`%${address}%`);
			}
			if (! is.empty(telphone)) {
				whereStr = whereStr + (is.empty(whereStr) ? 'WHERE' : 'AND') +
				' `telphone` LIKE ' + mysql.escape( `%${telphone}%`);
			}
			const result = yield mysql.query('SELECT * FROM `warehouse`' + whereStr);
			return result;
		}

		/*
		SELECT warehouse.* 
		FROM `employee`
			INNER JOIN `warehouse`
				ON employee.phone = '18801615551' AND employee.warehouseId = warehouse.id
		*/

		* findByUserId(userId) {
			const warehouses = yield app.mysql.query('SELECT warehouse.* FROM `employee` ' +
											'INNER JOIN `warehouse` ' +
											'ON employee.phone = ? AND employee.warehouseId = warehouse.id', [userId]);
			if (warehouses && warehouses.length >= 1) {
				return warehouses[0];
			}
			return {};
		}
	}
}