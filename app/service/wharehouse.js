module.exports = app => {
	return class WharehouseService extends app.Service {
		* find(id) {
			const wharehouse = yield app.mysql.get('wharehouse', { id });
			return wharehouse;
		}

		* update(wharehouse) {
			const result = yield app.mysql.update('wharehouse', wharehouse);
			return result.affectedRows === 1;
		}
	}
}