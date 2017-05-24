module.exports = app => {
  if (app.config.env !== 'prod') {
  	app.resources('employee', '/api/employee', app.controller.employee);
  	app.resources('wharehouse', '/api/wharehouse', app.controller.wharehouse);
    app.get('*', app.controller.welcome.index);
  } else {
    app.get('*', app.controller.render.index);
  }
}
