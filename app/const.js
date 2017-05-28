module.exports = {
  errors: {
  	INVALID_ACCOUNT_OR_PARSWORD: {
  		code: 'INVALID_ACCOUNT_OR_PARSWORD',
  		message: '帐号密码错误',
  	},
  	NO_PERMISSION: {
  		code: 'NO_PERMISSION',
  		message: '没用权限进行此操作',
  	},
  	NOT_LOGIN: {
  		code: 'NOT_LOGIN',
  		message: '请先登录'
  	},
    INVALID_PARAM: {
      code: 'invalid_param',
      message: 'Validation Failed'
    }
  },
  permissions: {
  	LOGIN_PERMISSSON: 1,
    MANAER_WAREHOUSE: 2,
  },
  permissionCheckRoles: [
  	{
  		permission: 'MANAER_WAREHOUSE',
  		match: ['^/api/warehouse'],
  		methods: ['POST', 'PUT'],
  	}
  ],
};