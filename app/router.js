module.exports = app => {
  if (app.config.env !== 'prod') {
    app.post('rfid', '/api/rfid', app.controller.rfid.create);
  	app.post('login', '/api/login', app.controller.login.login);
  	app.get('logout', '/api/logout', app.controller.login.logout);
    app.get('permission', '/api/permission', app.controller.permission.get);
  	app.resources('employee', '/api/employee', app.controller.employee);
  	app.resources('warehouse', '/api/warehouse', app.controller.warehouse);
    app.post('filterWarehouse', '/api/warehouse/filter', app.controller.warehouse.filter);
    app.get('*', app.controller.welcome.index);
  } else {
    app.get('*', app.controller.render.index);
  }
}
