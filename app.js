module.exports = app => {
  app.beforeStart(function* () {
    // 应用会等待这个函数执行完成才启动
    yield app.runSchedule('wechat_access_token');
  });
};