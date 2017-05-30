
# API Document

## api login
### router name: login
### path: /api/login
### method: POST
### permission: none
### request body:
<pre><code>
{
	"phone": "",
	"password": ""
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
  "code": 9001,
  "data": {},
  "message": "账号或密码错误"
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
### 获取登录人所在的仓库的仓库信息
### router name: warehouse
### path: /api/warehouse
### method: GET
### permission none
### 200 response body:
<pre><code>
{
  "code": 200,
  "data": {
    "id": 1,
    "name": "测试仓库",
    "address": "江苏徐州泉山区",
    "telphone": "0516-4625386",
    "createDate": "2017-05-28T07:33:27.000Z",
    "updateDate": "2017-05-28T07:33:27.000Z"
  },
  "message": ""
}
</code></pre>

## api get warehouse
### router name: warehouse
### path: /api/warehouse:id
### method: GET
### permission: MANAER_WAREHOUSE
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
### error:
1. 仓库不存在
<pre><code>
{
  "code": 9006,
  "data": {},
  "message": "仓库不存在"
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
</code></pre>
2. 权限验证失败

## api filter warehouse
### router name: filterWarehouse
### path: /api/warehouse/filter
### method: POST
### permission: MANAER_WAREHOUSE
### request body:
<pre><code>
{
  "name": "",
  "address": "",
  "telphone": ""
}
### 200 reponse body:
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "name": "测试仓库",
      "address": "江苏徐州泉山区",
      "telphone": "0516-4625386",
      "createDate": "2017-05-28T07:33:27.000Z",
      "updateDate": "2017-05-28T07:33:27.000Z"
    },
    {
      "id": 2,
      "name": "4",
      "address": "5",
      "telphone": "3",
      "createDate": "2017-05-28T10:44:27.000Z",
      "updateDate": "2017-05-28T10:56:34.000Z"
    }
  ],
  "message": ""
}

## api delete warehouse
### router name: warehouse
### path: /api/warehouse
### method: DELETE
### permission: MANAGER_WAREHOUSE
### 200 response body:
<pre><code>
{
  "code": 200,
  "data": {},
  "message": ""
}
</code></pre>
### errors:
1. 删除仓库前，请先删除仓库中的人员
<pre><code>
{
  "code": 9005,
  "data": {},
  "message": "删除仓库前，请先删除仓库中的人员"
}
</code></pre>

2. 仓库不存在
<pre><code>
{
  "code": 9006,
  "data": {},
  "message": "仓库不存在"
}
</code></pre>

## api get employee by id
### router name: employee
### path: /api/employee/:id
### method: GET
### permission: MANAGE_EMPLOYEE
### 200 response body:
<pre><code>
{
  "code": 200,
  "data": {
    "id": 1,
    "name": "王友生",
    "phone": "18801615551",
    "warehouseId": 1,
    "RFID": null,
    "createDate": "2017-05-28T07:33:27.000Z",
    "updateDate": "2017-05-28T07:33:27.000Z"
  },
  "message": ""
}
</code></pre>

## api create employee
### router name: employee
### path: /api/employee
### method: POST
### permission: MANAGE_EMPLOYEE
### 200 response body:
<pre><code>
{
  "code": 200,
  "data": {
    "id": 3
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
      "message": "should be an integer",
      "code": "invalid",
      "field": "roleId"
    }
  ],
  "message": "验证字段失败"
}
</code></pre>

2. 电话已存在
<pre><code>
{
  "code": 9007,
  "data": {},
  "message": "电话号码已存在"
}
</code></pre>

## api update employee
### router name: employee
### path: /api/employee
### method: PUT
### permission: MANAGE_EMPLOYEE
### 200 response body:
<pre>
  <code>
  {
    "code": 200,
    "data": {},
    "message": ""
  }
  </code>
</pre>
### errors
1. 字段验证失败
<pre><code>
{
  "code": 9004,
  "data": [
    {
      "message": "should be an integer",
      "code": "invalid",
      "field": "roleId"
    }
  ],
  "message": "验证字段失败"
}
</code></pre>

2. 电话已存在
<pre><code>
{
  "code": 9007,
  "data": {},
  "message": "电话号码已存在"
}
</code></pre>

## api get permissions
### router name: permission
### path: /api/permission
### method: GET
### permission: none
### 200 response body:
<pre>
  <code>
  {
    "code": 200,
    "data": [
      {
        "id": 1,
        "name": "LOGIN",
        "displayName": "登陆"
      },
      {
        "id": 2,
        "name": "MANAGE_WAREHOUSE",
        "displayName": "管理仓库"
      },
      {
        "id": 3,
        "name": "MANAGE_ENPLOYEE",
        "displayName": "管理员工"
      }
    ],
    "message": ""
  }
  </code>
</pre>