module.exports = app => {
  app.get('*', app.controller.render.index)
}
