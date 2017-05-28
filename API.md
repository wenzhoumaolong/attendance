#-----------------------(^_^)--------------------------#

# api login
## router name: login
## path: /api/login
## method: POST
## permission: none
## request body:
	{
		"phone": '',
		"password": ''
	}
## 200 response body:
	{
		"success": ture
	}
## 400 error
		1. 帐号密码错误
		{
		  "success": false,
		  "code": "INVALID_ACCOUNT_OR_PARSWORD",
		  "message": "帐号密码错误"
		}
		2. 没用权限登陆

#-----------------------(^_^)--------------------------#

# api logout
## router name: logout
## path: /api/logout
## method: GET
## permission: none
## 200 response body:
	{
		"success": ture
	}

#-----------------------(^_^)--------------------------#

# api get warehouse
## router name: warehouse
## path: /api/warehouse:id
## method: GET
## permission: none
## 200 response body:
	{
	  "id": 2,
	  "name": "2",
	  "address": "2",
	  "telphone": "2",
	  "createDate": "2017-05-28T06:29:22.000Z",
	  "updateDate": "2017-05-28T06:45:27.000Z"
	}

#-----------------------(^_^)--------------------------#

# api update warehouse
## router name: warehouse
## path: /api/warehouse:id
## method: PUT
## permession: MANAER_WAREHOUSE
## 200 response body:
	{
		"success": true
	}
## 400 errors
	1. 字段验证失败
		{
		  "success": false,
		  "code": "invalid_param",
		  "message": "Validation Failed"
		}

#-----------------------(^_^)--------------------------#

# api create warehouse
## router name: warehouse
## path: /api/warehouse:id
## method: POST
## permession: MANAER_WAREHOUSE
## 200 response body:
	{
		"id": ""
	}
## 400 errors
	1. 字段验证失败
		{
		  "success": false,
		  "code": "invalid_param",
		  "message": "Validation Failed"
		}

#-----------------------(^_^)--------------------------#
