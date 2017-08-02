USE `attendance`;



-- INSERT INTO 
-- 	`warehouse` (
--   `name`,
--   `address`,
--   `telphone`,
--   `createDate`,
--   `updateDate`
-- 	)
--   VALUES (
-- 		'测试仓库',
-- 		'江苏徐州泉山区',
--     '0516-4625386',
--     NOW(),
--     NOW()
--   );

INSERT INTO `grade` (`displayname`) values ('一年级');
INSERT INTO `grade` (`displayname`) values ('二年级');
INSERT INTO `grade` (`displayname`) values ('三年级');
INSERT INTO `grade` (`displayname`) values ('四年级');
INSERT INTO `grade` (`displayname`) values ('五年级');
INSERT INTO `grade` (`displayname`) values ('六年级');

INSERT INTO `class` (`gradeId`, `displayname`) values (1, '1');
INSERT INTO `class` (`gradeId`, `displayname`) values (1, '2');
INSERT INTO `class` (`gradeId`, `displayname`) values (1, '3');
INSERT INTO `class` (`gradeId`, `displayname`) values (1, '4');
INSERT INTO `class` (`gradeId`, `displayname`) values (1, '5');
INSERT INTO `class` (`gradeId`, `displayname`) values (2, '1');
INSERT INTO `class` (`gradeId`, `displayname`) values (2, '2');
INSERT INTO `class` (`gradeId`, `displayname`) values (2, '3');


INSERT INTO 
  `admin` (
    `username`,
    `password`
  )
  VALUES (
    'admin',
    'c4ca4238a0b923820dcc509a6f75849b'
  );
    
INSERT INTO 
		`employee` (
			`name`,
			`phone`,
			`gradeId`,
      `classId`,
      `createDate`,
      `updateDate`
		)
    VALUES (
			'王友生',
      '11111',
      1,
      1,
      NOW(),
      NOW()
  ); 

    