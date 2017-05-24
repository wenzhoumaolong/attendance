USE `attendance`;

INSERT INTO 
	`employee_role` (
		`id`,
		`roleName`
	)
	 VALUES (
		1, 
		'管理员'
	);
    
INSERT INTO 
	`employee_role` (
		`id`,
		`roleName`
	)
	 VALUES (
		2, 
		'员工'
	);

INSERT INTO 
	`wharehouse` (
        `wharehouseName`,
        `wharehouseAddress`,
        `wharehouseAccount`,
        `wharehousePassword`,
        `wharehouseTelphone`,
        `createDate`,
        `updateDate`
	)
    VALUES (
		'测试仓库',
		'江苏徐州泉山区',
        'ceshi',
        'abc123_',
        '0516-4625386',
        NOW(),
        NOW()
    );
    
    INSERT INTO 
		`employee` (
			`employeeName`,
			`employeePhone`,
			`roleId`,
            `wharehouseId`,
            `createDate`,
            `updateDate`
		)
        VALUES (
			'王友生',
            '18801615551',
            1,
            1,
            NOW(),
            NOW()
        );
    
    