const Transfer = require('../model/response');
const { SYSTEM_ERROR,
	INVALID_RFID_STATUS,
	NOT_EXIST_RFID_EMPLOYEE,
  HAS_SENT_MESSAGE_ERROR,
	NOT_EXIST_RFID } = require('../error');
// TopClient = require('../sdk/alibabasms/topClient').TopClient;
const moment = require('moment');

module.exports = app => {
	return class AdminService extends app.Service {

		* saveIdentity(identity) {
			const employee = yield this.service.employee.findByRFID(identity);
      if (!employee) {
        return { success: false, error: NOT_EXIST_RFID_EMPLOYEE }
      }
      const currentDateTime = moment();
      var status = '';
      var startDate = '';
      var endDate = '';
      const sendMessageDateTimeSetting = app.sendMessageDateTimeSetting;
      for (var index in sendMessageDateTimeSetting) {
        var item = sendMessageDateTimeSetting[index];
        startDate = moment().hours(item.startHour).minutes(item.startMinute);
        endDate = moment().hours(item.endHour).minutes(item.endMinute);
        console.log(currentDateTime > startDate);
        if (currentDateTime > startDate && currentDateTime < endDate) {
          status = item.status;
          break;
        }
      }
      if (status.length == 0) {
        return { success: false, error: INVALID_RFID_STATUS };
      }
      const hasSentMessage = yield this.service.record.hasSentMessage(employee.id, startDate.format( 'YYYY-MM-DD HH:mm'), endDate.format('YYYY-MM-DD HH:mm'));
      if (hasSentMessage) {
        return { success: false, error: HAS_SENT_MESSAGE_ERROR };
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
