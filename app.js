module.exports = app => {
  app.beforeStart(function* () {
    // 应用会等待这个函数执行完成才启动
    yield app.runSchedule('wechat_access_token');
    // 获取发送消息的时间段
    app.sendMessageDateTimeSetting = [
{
        status: 'IN',
        startHour: 18,
        startMinute: 20,
        endHour: 18,
        endMinute: 26
      },
{
        status: 'OUT',
        startHour: 18,
        startMinute: 25,
        endHour: 18,
        endMinute: 31
      },
{
        status: 'IN',
        startHour: 18,
        startMinute: 30,
        endHour: 18,
        endMinute: 36
      },
      {
        status: 'OUT',
        startHour: 18,
        startMinute: 35,
        endHour: 18,
        endMinute: 41
      },
      {
        status: 'IN',
        startHour: 18,
        startMinute: 40,
        endHour: 18,
        endMinute: 46
      },
      {
        status: 'OUT',
        startHour: 18,
        startMinute: 50,
        endHour: 18,
        endMinute: 56
      },
      {
        status: 'IN',
        startHour: 18,
        startMinute: 55,
        endHour: 19,
        endMinute: 1
      },
{
        status: 'OUT',
        startHour: 19,
        startMinute: 0,
        endHour: 19,
        endMinute: 6
      },
{
        status: 'IN',
        startHour: 19,
        startMinute: 5,
        endHour: 19,
        endMinute: 11
      },
{
        status: 'OUT',
        startHour: 19,
        startMinute: 10,
        endHour: 19,
        endMinute: 15
      },{
        status: 'IN',
        startHour: 19,
        startMinute: 15,
        endHour: 19,
        endMinute: 21
      },{
        status: 'OUT',
        startHour: 19,
        startMinute: 20,
        endHour: 19,
        endMinute: 26
      },{
        status: 'IN',
        startHour: 19,
        startMinute: 25,
        endHour: 19,
        endMinute: 31
      },{
        status: 'OUT',
        startHour: 19,
        startMinute: 30,
        endHour: 20,
        endMinute: 11
      },{
        status: 'IN',
        startHour: 20,
        startMinute: 10,
        endHour: 20,
        endMinute: 21
      },{
        status: 'OUT',
        startHour: 20,
        startMinute: 20,
        endHour: 20,
        endMinute: 31
      },{
        status: 'IN',
        startHour: 20,
        startMinute: 30,
        endHour: 20,
        endMinute: 41
      }
,{
        status: 'IN',
        startHour: 20,
        startMinute: 30,
        endHour: 23,
        endMinute: 41
      }
    ];
  });
};
