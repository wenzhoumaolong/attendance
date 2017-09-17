module.exports = app => {
  app.beforeStart(function* () {
    // 应用会等待这个函数执行完成才启动
    yield app.runSchedule('wechat_access_token');
    // 获取发送消息的时间段
    app.sendMessageDateTimeSetting = [
      {
        status: 'IN',
        startHour: 7,
        startMinute: 30,
        endHour: 8,
        endMinute: '30'
      },
      {
        status: 'OUT',
        startHour: 11,
        startMinute: 30,
        endHour: 12,
        endMinute: '30'
      }
    ];
  });
};
