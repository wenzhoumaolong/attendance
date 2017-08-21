const Transfer = require('../model/response');
const { EXIST_RFID,
	SYSTEM_ERROR,
	INVALID_RFID_STATUS,
	NOT_EXIST_RFID_EMPLOYEE,
	NOT_EXIST_RFID } = require('../error');
// TopClient = require('../sdk/alibabasms/topClient').TopClient;
const moment = require('moment');

module.exports = app => {
	return class AdminService extends app.Service {

		* saveIdentity(identity, status) {
			const employee = yield this.service.employee.findByRFID(identity);
			if (status == 'NEW') {
				if (employee) {
					const message = EXIST_RFID.message + employee.name;
					return { success: false, error: { code: EXIST_RFID.code, message } };
				}
				const result = yield app.mysql.insert('rfid', { identity, status });
				return { success: result.affectedRows === 1, error: SYSTEM_ERROR };
			} else if (status == 'OUT' || status == 'IN') {
				if (!employee) {
					return { success: false, error: NOT_EXIST_RFID_EMPLOYEE }
				}
				const result = yield app.mysql.insert('attendance_record',
					{ 
						employeeId: employee.id,
						recordType: status
					});
				yield this.service.wechat.sendTemplate(employee, status);
				if (employee.isObserved == 1) {
					const { alSMSAppKey, alSMSappsecret, alSMSREST_URL,
						alSMSSignName, alSMSTemplateCodeIn, alSMSTemplateCodeOut } = app.config;
					var client = new TopClient({
                            'appkey': alSMSAppKey,
                            'appsecret': alSMSappsecret,
                            'REST_URL': alSMSREST_URL});

					client.execute('alibaba.aliqin.fc.sms.num.send',
              {
              	'extend': '',
              	'sms_type': 'normal',
              	'sms_template_code': status == 'OUT' ? alSMSTemplateCodeOut : alSMSTemplateCodeIn,
              	'sms_param': {
              		'name': employee.name,
              	},
              	'sms_free_sign_name': alSMSSignName,
              	'rec_num': employee.observedPhone,
              	'format': 'json'
              },
              function (error,response) {
								console.log(error);
								console.log(response);
              })
				}
				return { success: result.affectedRows === 1, error: SYSTEM_ERROR };
			}

			return { success: false, error: INVALID_RFID_STATUS };
		}

		* getNewestRfid() {
			const rfids = yield app.mysql.query('SELECT * FROM `rfid` ORDER BY `id`  DESC LIMIT 0, 1');
			if (rfids && rfids.length == 1) {
				const rfid = rfids[0]
				const resut = yield app.mysql.delete('rfid', { id: rfid.id });
				return { success: true, identity: rfid.identity };
			}
			return { success: false, error: NOT_EXIST_RFID };
		}
	}
}
