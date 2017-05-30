module.exports = {
  permissions: {
  	LOGIN_PERMISSSON: 1,
    MANAGE_WAREHOUSE: 2,
    MANAGE_EMPOLYEE: 3,
  },
  permissionCheckRoles: [
  	{
  		permission: 'MANAGE_WAREHOUSE',
  		match: ['^/api/warehouse'],
  		methods: ['POST', 'PUT', 'DELETE'],
  	},
    {
      permission: 'MANAGE_WAREHOUSE',
      match: ['^/api/warehouse/'],
      methods: ['GET'],
    },
    {
      permission: 'MANAGE_EMPOLYEE',
      match: ['^/api/employee'],
      methods: ['GET', 'POST', 'PUT']
    },
    {
      permission: 'LOGIN_PERMISSSON',
      match: ['^/api/permission'],
      methods:['GET']
    }
  ],
};