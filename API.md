# API Document

## api login
### router name: login
### path: /api/login
### method: POST
### permission: none
### request body:
<pre><code>
{
	"phone": '',
	"password": ''
}
</code></pre>
### 200 response body:
<pre><code>
{
  "code": 200,
  "data": 
  	{ 
  		name: "" 
  	},
  "message": ""
}
</code></pre>
### error
1. 帐号密码错误
<pre><code>
{
  "success": false,
  "code": "INVALID_ACCOUNT_OR_PASSWORD",
  "message": "帐号密码错误"
}
</code></pre>
2. 没用权限登陆

## api logout
### router name: logout
### path: /api/logout
### method: GET
### permission: none
### 200 response body:
<pre><code>
{
  "code": 200,
  "data": 
  	{ 
  		name: "" 
  	},
  "message": ""
}
</code></pre>

## api get warehouse
### router name: warehouse
### path: /api/warehouse:id
### method: GET
### permission: none
### 200 response body:
<pre><code>
{
	"code": 200,
	"data": 
	  "id": 2,
	  "name": "2",
	  "address": "2",
	  "telphone": "2",
	  "createDate": "2017-05-28T06:29:22.000Z",
	  "updateDate": "2017-05-28T06:45:27.000Z"
	},
	"message": ""
}
</code></pre>

## api update warehouse
### router name: warehouse
### path: /api/warehouse:id
### method: PUT
### permession: MANAER_WAREHOUSE
### 200 response body:
<pre><code>
{
  "code": 200,
  "data": {},
  "message": ""
}
</code></pre>
### errors
1. 字段验证失败
<pre><code>
{
  "code": 9004,
  "data": [
    {
      "message": "should not be empty",
      "code": "invalid",
      "field": "telphone"
    }
  ],
  "message": "Validation Failed"
}
2. 权限验证失败
</code></pre>

## api create warehouse
### router name: warehouse
### path: /api/warehouse:id
### method: POST
### permession: MANAER_WAREHOUSE
### request body:
<pre><code>
{
  "name": "",
  "address": "",
  "telphone": ""
}
</code></pre>
### 200 response body:
<pre><code>
{
  "code": 200,
  "data": {
    "id": "" //新创建的仓库Id
  },
  "message": ""
}
</code></pre>
### errors
1. 字段验证失败
<pre><code>
{
  "code": 9004,
  "data": [
    {
      "message": "should not be empty",
      "code": "invalid",
      "field": "telphone"
    }
  ],
  "message": "Validation Failed"
}
2. 权限验证失败
</code></pre>
