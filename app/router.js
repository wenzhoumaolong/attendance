module.exports = app => {
  if (app.config.env !== 'prod') {
    app.post('rfid', '/api/rfid', app.controller.rfid.create);
    app.get('rfid', '/api/rfid', app.controller.rfid.get);
    app.get('setting', '/api/settings/grade', app.controller.settings.getGrade);
    app.get('setting', '/api/settings/class', app.controller.settings.getClasses);
  	app.post('login', '/api/login', app.controller.login.login);
    app.post('changePassword', '/api/change-password', app.controller.login.changePassword);
  	app.get('logout', '/api/logout', app.controller.login.logout);
    app.get('wechat', '/api/wechat', app.controller.wechat.get);
    app.post('record', '/api/record', app.controller.record.queryRecords);
    app.get('permission', '/api/permission', app.controller.permission.get);
  	app.resources('employee', '/api/employee', app.controller.employee);
  	app.resources('warehouse', '/api/warehouse', app.controller.warehouse);
    app.post('filterWarehouse', '/api/warehouse/filter', app.controller.warehouse.filter);
    app.post('queryemployee', '/api/employee/query', app.controller.employee.queryEmployees);
    app.get('wechat', '/api/wechat/oauth', app.controller.wechat.getOauthInfo);
    app.get('wechat', '/api/wechat/bind', app.controller.wechat.bind);
    app.get('wechat', '/api/wechat/get-oauth', app.controller.wechat.getOauthPage);
    app.get('wechat', '/api/wechat/send-template', app.controller.wechat.sendTemplate);
    app.get('*', app.controller.render.index);
  } else {
	app.post('rfid', '/api/rfid', app.controller.rfid.create);
    app.get('rfid', '/api/rfid', app.controller.rfid.get);
    app.get('setting', '/api/settings/grade', app.controller.settings.getGrade);
    app.get('setting', '/api/settings/class', app.controller.settings.getClasses);
  	app.post('login', '/api/login', app.controller.login.login);
    app.post('changePassword', '/api/change-password', app.controller.login.changePassword);
  	app.get('logout', '/api/logout', app.controller.login.logout);
    app.post('record', '/api/record', app.controller.record.queryRecords);
    app.get('permission', '/api/permission', app.controller.permission.get);
  	app.resources('employee', '/api/employee', app.controller.employee);
  	app.resources('warehouse', '/api/warehouse', app.controller.warehouse);
    app.post('filterWarehouse', '/api/warehouse/filter', app.controller.warehouse.filter);
    app.post('queryemployee', '/api/employee/query', app.controller.employee.queryEmployees);
    app.get('wechat', '/api/wechat', app.controller.wechat.get);
    app.get('wechat', '/api/wechat/oauth', app.controller.wechat.getOauthInfo);
    app.get('wechat', '/api/wechat/bind', app.controller.wechat.bind);
    app.get('wechat', '/api/wechat/get-oauth', app.controller.wechat.getOauthPage);
    app.get('wechat', '/api/wechat/send-template', app.controller.wechat.sendTemplate);
    app.get('*', app.controller.render.index);
  }
}