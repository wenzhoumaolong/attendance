const { SYSTEM_ERROR } = require('../error');
var moment = require('moment');

module.exports = app => {
	return class WechatService extends app.Service {
		* sendTemplate(employee, status) {
			const { access_token } = app.weChatCache;
      const statueStr = status == 'IN' ? '进' : '出';

      employee.map(item => {
        this.send(item.openId, employee);
      })
		}

    * send(openId, employee) {
      var bindUser = '';
      var remark = '';
      employee.map((item) => {
        if (item.openId != openId) {
          bindUser = bindUser + item.nickname + '，';
        }
      });
      if (bindUser.length > 0) {
        bindUser = bindUser.substring(0, bindUser.length - 1);
        remark = `提示：收到该信息的还有${bindUser}。`
      }

      const data =  {
        "touser":"oFX9X0R8Cv0EMDKMPQ-XKZSeQFtE",
        "template_id": openId,        
        "data":{
          "first": {
            "value":`您好，${employee.name}已${statueStr}学校`,
            "color":"#173177"
          },
          "childName":{
            "value": employee.name,
            "color":"#173177"
          },
          "time": {
            "value":moment().format('YYYY-MM-DD'),
            "color":"#173177"
          },
          "status": {
            "value":`${statueStr}学校`,
            "color":"#173177"
          },
          "remark":{
            "value": remark,
            "color":"#173177"
          }
        }
      }
      const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`;
      const result = yield app.curl(url, {
        method: 'POST',
        contentType: 'json',
        data,
        dataType: 'json',
      });
    }

    * bind(wechat) {
      const result = yield app.mysql.insert('wechat_information', wechat);
      return { success: result.affectedRows === 1, error: SYSTEM_ERROR };
    }
	}
}
