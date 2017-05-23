CREATE DATABASE attendance;

USE attendance;

CREATE TABLE wharehouse (
	id INT PRIMARY KEY AUTO_INCREMENT,
    wharehouseName VARCHAR(50) NOT NULL,
    wharehouseAddress VARCHAR(250) NOT NULL,
    wharehouseAccount VARCHAR(50) NOT NULL,
    wharehousePasswor VARCHAR(50) NOT NULL,
    wharehouseTelphone VARCHAR(20) NOT NULL,
    createDate DATETIME NOT NULL,
    updateDate DATETIME NOT NULL
);

CREATE TABLE employee_role (
	id INT PRIMARY KEY,
    roleName VARCHAR(10) NOT NULL
);

CREATE TABLE permission (
	id INT PRIMARY KEY,
    permissionName VARCHAR(10) NOT NULL
);

CREATE TABLE role_permisson_mapping (
	id INT PRIMARY KEY AUTO_INCREMENT,
    roleId INT NOT NULL,
    permissonId INT NOT NULL
);

/*
observers => employeeId joint by ','
*/
CREATE TABLE employee (
	id INT PRIMARY KEY AUTO_INCREMENT ,
	employeeName VARCHAR(50) NOT NULL,
    employeePhone VARCHAR(20) NOT NULL,
    employeeWechat VARCHAR(50) NOT NULL,
    roleId INT NOT NULL,
	wharehouseId INT NOT NULL,
    RFID VARCHAR(50),
    createDate DATETIME NOT NULL,
    updateDate DATETIME NOT NULL,
    observers TEXT
);

/*
recordType contains IN and OUT
*/

CREATE TABLE attendance_record (
	id INT PRIMARY KEY AUTO_INCREMENT,
    employeeId INT NOT NULL REFERENCES employee(id),
    recordType VARCHAR(10) NOT NULL,
    createDate DATETIME
);

ALTER TABLE role_permisson_mapping ADD CONSTRAINT role_permisson_mapping_roleId FOREIGN KEY (`roleId`) REFERENCES employee_role(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE role_permisson_mapping ADD CONSTRAINT role_permisson_mapping_permissonId FOREIGN KEY (`permissonId`) REFERENCES permission(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE employee ADD CONSTRAINT employee_wharehouseId FOREIGN KEY (`wharehouseId`) REFERENCES wharehouse(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE employee ADD CONSTRAINT employee_roleId FOREIGN KEY (`roleId`) REFERENCES employee_role(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE attendance_record ADD CONSTRAINT attendance_record_employeeId FOREIGN KEY (`employeeId`) REFERENCES employee(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;