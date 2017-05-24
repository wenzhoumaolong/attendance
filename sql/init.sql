CREATE DATABASE `attendance`;

USE `attendance`;

CREATE TABLE `wharehouse` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `wharehouseName` VARCHAR(50) NOT NULL,
    `wharehouseAddress` VARCHAR(250) NOT NULL,
    `wharehouseAccount` VARCHAR(50) NOT NULL,
    `wharehousePassword` VARCHAR(50) NOT NULL,
    `wharehouseTelphone` VARCHAR(20) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `updateDate` DATETIME NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `employee_role` (
	`id` INT PRIMARY KEY,
    `roleName` VARCHAR(10) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `permission` (
	`id` INT PRIMARY KEY,
    `permissionName` VARCHAR(10) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `role_permisson_mapping` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `roleId` INT NOT NULL,
    `permissonId` INT NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*
observers => employeeId joint by ','
*/
CREATE TABLE `employee` (
	`id` INT PRIMARY KEY AUTO_INCREMENT ,
	`employeeName` VARCHAR(50) NOT NULL,
    `employeePhone` VARCHAR(20) NOT NULL,
    `roleId` INT NOT NULL,
	`wharehouseId` INT NOT NULL,
    `RFID` VARCHAR(50),
    `createDate` DATETIME NOT NULL,
    `updateDate` DATETIME NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `observer_relation` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `observerId` INT NOT NULL,
    `observedId` INT NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `wechat_information` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `openId` VARCHAR(50),
    `employeeId` INT NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*
recordType contains IN and OUT
*/

CREATE TABLE `attendance_record` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `employeeId` INT NOT NULL REFERENCES employee(id),
    `recordType` VARCHAR(10) NOT NULL,
    `createDate` DATETIME
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `role_permisson_mapping` ADD CONSTRAINT `role_permisson_mapping_roleId` FOREIGN KEY (`roleId`) REFERENCES employee_role(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `role_permisson_mapping` ADD CONSTRAINT `role_permisson_mapping_permissonId` FOREIGN KEY (`permissonId`) REFERENCES permission(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `employee` ADD CONSTRAINT `employee_wharehouseId` FOREIGN KEY (`wharehouseId`) REFERENCES wharehouse(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `employee` ADD CONSTRAINT `employee_roleId` FOREIGN KEY (`roleId`) REFERENCES employee_role(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `attendance_record` ADD CONSTRAINT `attendance_record_employeeId` FOREIGN KEY (`employeeId`) REFERENCES employee(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `wechat_information` ADD CONSTRAINT `wechat_information` FOREIGN KEY (`employeeId`) REFERENCES employee(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `observer_relation` ADD CONSTRAINT `observer_relation_observerId` FOREIGN KEY (`observerId`) REFERENCES employee(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `observer_relation` ADD CONSTRAINT `observer_relation_observedId` FOREIGN KEY (`observedId`) REFERENCES employee(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
