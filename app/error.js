module.exports = {
  INVALID_ACCOUNT_OR_PASSWORD: {
    code: 9001,
    message: '账号或密码错误'
  },
  NO_PERMISSION: {
    code: 9002,
    message: '没用权限进行此操作'
  },
  NOT_LOGIN: {
		code: 9003,
		message: '请先登录'
	},
	INVALID_PARAM: {
    code: 9004,
    message: '验证字段失败'
  },
  WAREHOUSE_HAS_EMPLOYEE: {
  	code: 9005,
  	message: '删除仓库前，请先删除仓库中的人员'
  },
  NOT_EXIST_WAREHOUSE: {
  	code: 9006,
  	message: '仓库不存在'
  },
  EXIST_PHONE: {
  	code: 9007,
  	message: '学号已存在'
  },
  INVALID_IDENTITY: {
    code: 9008,
    message: '设别串码有误'
  },
  EXIST_RFID: {
    code: 9009,
    message: '改卡片已录入，卡片属于'
  },
  SYSTEM_ERROR: {
    code: 9010,
    message: '系统错误，请联系管理员'
  },
  INVALID_RFID_STATUS: {
    code: 9011,
    message: '状态码有误'
  },
  NOT_EXIST_RFID_EMPLOYEE: {
    code: 9012,
    message: '找不到此卡持有人'
  },
  NOT_EXIST_RFID: {
    code: 9013,
    message: '找不到卡片信息，请从新刷卡'
  },
  WECHAT_GETINFO_ERROR: {
    code: 9014,
    message: '获取信息失败，请稍后再试'
  }
}
