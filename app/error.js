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
  	message: '电话号码已存在'
  }
}
