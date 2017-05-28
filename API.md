#-----------------------(^_^)--------------------------#

# api login
## router name: login
## path: /api/login
## method: POST
## request body:
	{
		phone: '',
		password: ''
	}
## 200 response body:
	{
		success: ture
	}
## 400 error
		1. 帐号密码错误
		{
		  "success": false,
		  "code": "INVALID_ACCOUNT_OR_PASSWORD",
		  "message": "帐号密码错误"
		}
		2. 没用权限登陆

#-----------------------(^_^)--------------------------#

# api logout
## router name: logout
## path: /api/logout
## method: GET
## 200 response body:
	{
		success: ture
	}

#-----------------------(^_^)--------------------------#
