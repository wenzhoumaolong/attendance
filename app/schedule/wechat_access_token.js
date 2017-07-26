module.exports = {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  schedule: {
    interval: '110m', // 110 分钟间隔
    type: 'worker', // 指定所有的 worker 都需要执行
  },
  // task 是真正定时任务执行时被运行的函数，第一个参数是一个匿名的 Context 实例
  * task(ctx) {
    const { wechatAppId, wechatAppsecret } = ctx.app.config;
    const res = yield ctx.curl(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wechatAppId}&secret=${wechatAppsecret}`,
      {
        dataType: 'json',
      });
    console.log('get wechat access token done');
    console.log(res.data);
    ctx.app.weChatCache = res.data;
  },
};
