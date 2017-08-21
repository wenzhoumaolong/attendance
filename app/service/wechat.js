const { SYSTEM_ERROR, MAX_OBSERVER } = require('../error');
const moment = require('moment');

module.exports = app => {
	return class WechatService extends app.Service {
		* sendTemplate(employee, status) {
      const observer = yield app.mysql.select('wechat_information', { employeeId: employee.id });

      for (var i = 0; i < observer.length; i++) {
        yield this.send(observer[i].openid, employee, observer, status);
      }
		}

    * send(openId, employee, observer, status) {
      var bindUser = '';
      var remark = '';
      const { access_token } = app.weChatCache;
      const statueStr = status == 'IN' ? '进' : '出';
      observer.map((item) => {
        if (item.openId != openId) {
          bindUser = bindUser + item.nickname + '，';
        }
      });
      if (bindUser.length > 0) {
        bindUser = bindUser.substring(0, bindUser.length - 1);
        remark = `提示：收到该信息的还有${bindUser}。`
      }

      const data =  {
        "touser": openId,
        "template_id": 'VXRHGaGIQXI6345Jg_cau7cDwBp6Hp-P97iWqJzXia4',        
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
            "value":moment().format('YYYY-MM-DD HH:mm'),
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
      const { id, openid, nickname, sex, province, city, country, headimgurl, employeeId } = wechat;
      const observer = yield app.mysql.select('wechat_information', {
        where: { employeeId: id }
      });
      if (observer.length >= 3) {
        return { success: false, error: MAX_OBSERVER };
      }
      const result = yield app.mysql.insert('wechat_information', 
        { id, openid, nickname, sex, province, city, country, headimgurl, employeeId });
      return { success: result.affectedRows === 1, error: SYSTEM_ERROR };
    }
	}
}
