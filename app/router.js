module.exports = app => {
  if (app.config.env !== 'prod') {
    app.get('*', app.controller.welcome.index)
  } else {
    app.get('*', app.controller.render.index)
  }
}
