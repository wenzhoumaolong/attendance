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
	`permission` (
		`id`,
    `name`,
    `displayName`
   ) VALUES (
		2,
    'MANAGE_WAREHOUSE',
    '管理仓库'
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
INSERT INTO
	`role_permission_mapping` (
		`roleId`,
     `permissionId`
   ) VALUES (
		1,
    '2'
  )
