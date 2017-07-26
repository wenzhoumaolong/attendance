module.exports = app => {
	return class WechatService extends app.Service {
		* sendTemplate() {
			const { access_token } = app.weChatCache;

			const data =  {
      	"touser":"oFX9X0R8Cv0EMDKMPQ-XKZSeQFtE",
       	"template_id":"VXRHGaGIQXI6345Jg_cau7cDwBp6Hp-P97iWqJzXia4",        
       	"data":{
         	"first": {
            "value":"恭喜你购买成功！",
            "color":"#173177"
         	},
         	"keynote1":{
            "value":"巧克力",
            "color":"#173177"
         	},
         	"keynote2": {
            "value":"39.8元",
            "color":"#173177"
         	},
         	"keynote3": {
            "value":"2014年9月22日",
            "color":"#173177"
         	},
         	"remark":{
           	"value":"欢迎再次购买！",
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
		  return result.data;
		}
	}
}
