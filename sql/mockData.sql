USE `attendance`;

INSERT INTO 
	`employee_role` (
		`id`,
		`name`,
		`displayName`
	)
	 VALUES (
		1, 
		'admin',
		'管理员'
	);
    
INSERT INTO 
	`employee_role` (
		`id`,
		`name`,
		`displayName`
	)
	 VALUES (
		2,
		'warehouseAdmin',
		'仓库管理员'
	);
INSERT INTO 
	`employee_role` (
		`id`,
		`name`,
		`displayName`
	)
	 VALUES (
		3,
		'employee',
		'员工'
	);

INSERT INTO 
	`warehouse` (
  `name`,
  `address`,
  `telphone`,
  `createDate`,
  `updateDate`
	)
  VALUES (
		'测试仓库',
		'江苏徐州泉山区',
    '0516-4625386',
    NOW(),
    NOW()
  );
    
    INSERT INTO 
		`employee` (
			`name`,
			`phone`,
			`password`,
			`roleId`,
      `warehouseId`,
      `createDate`,
      `updateDate`
		)
    VALUES (
			'王友生',
      '18801615551',
      'abc123_',
      1,
      1,
      NOW(),
      NOW()
  );
INSERT INTO 
	`permission` (
		`id`,
		`name`,
    `displayName`
	) VALUES (
		'1',
		'LOGIN',
    '登陆'
  );
INSERT INTO
	`role_permission_mapping` (
		`roleId`,
    `permissionId`
	) VALUES (
		1,
		1
	);
    
    