CREATE DATABASE `attendance`;

USE `attendance`;

CREATE TABLE `warehouse` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `address` VARCHAR(250) NOT NULL,
    `telphone` VARCHAR(50) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `updateDate` DATETIME NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `employee_role` (
	`id` INT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `displayName` VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `permission` (
	`id` INT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `displayName` VARCHAR(50) NOT NULL 
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `role_permission_mapping` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `roleId` INT NOT NULL,
    `permissionId` INT NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*
observers => employeeId joint by ','
*/
CREATE TABLE `employee` (
	`id` INT PRIMARY KEY AUTO_INCREMENT ,
	`name` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50),
    `roleId` INT NOT NULL,
	`warehouseId` INT NOT NULL,
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
    `recordType` VARCHAR(50) NOT NULL,
    `createDate` DATETIME
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `role_permission_mapping` ADD CONSTRAINT `role_permission_mapping_roleId` FOREIGN KEY (`roleId`) REFERENCES employee_role(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `role_permission_mapping` ADD CONSTRAINT `role_permission_mapping_permissionId` FOREIGN KEY (`permissionId`) REFERENCES permission(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `employee` ADD CONSTRAINT `employee_warehouseId` FOREIGN KEY (`warehouseId`) REFERENCES warehouse(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `employee` ADD CONSTRAINT `employee_roleId` FOREIGN KEY (`roleId`) REFERENCES employee_role(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `attendance_record` ADD CONSTRAINT `attendance_record_employeeId` FOREIGN KEY (`employeeId`) REFERENCES employee(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `wechat_information` ADD CONSTRAINT `wechat_information` FOREIGN KEY (`employeeId`) REFERENCES employee(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `observer_relation` ADD CONSTRAINT `observer_relation_observerId` FOREIGN KEY (`observerId`) REFERENCES employee(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `observer_relation` ADD CONSTRAINT `observer_relation_observedId` FOREIGN KEY (`observedId`) REFERENCES employee(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
