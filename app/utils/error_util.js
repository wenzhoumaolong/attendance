TopClient = require('../sdk/alibabasms/topClient').TopClient;

module.exports =  {
	createError: (param) => {
		var error = new Error();
		error.code = param.code;
		error.message = param.message;
		return error;
	},
	sendSMS: () => {
		var client = new TopClient({
	                    'appkey':'24568404',
	                    'appsecret':'30526427fb08debb1a5943558483921b',
	                    'REST_URL':'http://gw.api.taobao.com/router/rest'});

	  client.execute('alibaba.aliqin.fc.sms.num.send',
      {
        'extend': '',
        'sms_type': 'normal',
        'sms_template_code': 'SMS_80485030',
        'sms_param': {
          'name': '王友生',
        },
        'sms_free_sign_name': '校园管理系统',
        'rec_num': '18801615551',
        'format': 'json'
      },
      function (error,response) {
        if(!error)
          console.log(response);
        else
          console.log(error);
      })
	}
}
