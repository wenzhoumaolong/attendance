var WechatAPI = require('wechat-api');
var api = new WechatAPI('wx84ac462304bb229e', '64fef03efc3247143a4b404d753f236f', function (callback) {
  // 传入一个获取全局token的方法
  fs.readFile('access_token.txt', 'utf8', function (err, txt) {
    if (err) {return callback(err);}
    callback(null, JSON.parse(txt));
  });
}, function (token, callback) {
  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
  // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
  fs.writeFile('access_token.txt', JSON.stringify(token), callback);
});

var templateId = 'dG6XALYLwWNPOYfr5TX0FvZqg0Cjf8V-3uasN6Vl24U';

module.exports = app => {
	return class WechatService extends app.Service {
		* sendTemplate(openId, templateId, url, type, employee, callback) {
			var data = {
		   "first": {
		     "DATA":"恭喜你购买成功！",
		     "color":"#173177"
		   },
		   "childName":{
		     "DATA":"王友生",
		     "color":"#173177"
		   },
		   "time": {
		     "DATA":"2014年9月22日",
		     "color":"#173177"
		   },
		   "status": {
		     "DATA":"进",
		     "color":"#173177"
		   },
		   "remark":{
		     "DATA":"欢迎再次购买！",
		     "color":"#173177"
		   }
		};
			api.sendTemplate('openid', templateId, url, data, callback);
		}
	}
}
