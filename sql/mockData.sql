USE `attendance`;

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
    