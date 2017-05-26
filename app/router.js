module.exports = app => {
  if (app.config.env !== 'prod') {
  	/**
  	* request body { account: 'test', password: 'abc123_' }
  	* response  status code 200 { success: true }
  	* 	status { errorCode: '00000001', message: '帐号密码错误' }
  	**/
  	app.post('login', '/api/login', app.controller.login.login);
  	app.resources('employee', '/api/employee', app.controller.employee);
  	app.resources('warehouse', '/api/warehouse', app.controller.warehouse);
    app.get('*', app.controller.welcome.index);
  } else {
    app.get('*', app.controller.render.index);
  }
}
