module.exports = {
  permissions: {
  	LOGIN_PERMISSSON: 1,
    MANAER_WAREHOUSE: 2,
  },
  permissionCheckRoles: [
  	{
  		permission: 'MANAER_WAREHOUSE',
  		match: ['^/api/warehouse'],
  		methods: ['POST', 'PUT'],
  	},
    {
      permission: 'MANAER_WAREHOUSE',
      match: ['^/api/warehouse/'],
      methods: ['GET'],
    }
  ],
};