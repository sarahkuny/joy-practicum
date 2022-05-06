DROP TABLE if exists business;
 CREATE TABLE `business` (
	`project_id` int NOT NULL AUTO_INCREMENT,
	`project_files` longblob NULL,
	`contact_person` VARCHAR(40) NOT NULL,
	`business_name` VARCHAR(40) NOT NULL,
	`email` VARCHAR(40) NOT NULL,
	`phone` VARCHAR(15) NOT NULL,
	`created_at` DATETIME NOT NULL,
	PRIMARY KEY (`project_id`)
);

DROP TABLE if exists bootcamp_students;
CREATE TABLE `bootcamp_students` (
	`student_id` int NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(40) NOT NULL,
	`last_name` VARCHAR(40) NOT NULL,
	`email` VARCHAR(40) NOT NULL,
	`project_id` int  NULL,
	`instructor_id` int  NULL,
	PRIMARY KEY (`student_id`)
);

DROP TABLE if exists bootcamp_instructors;
CREATE TABLE `bootcamp_instructors` (
	`instructor_id` int NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(40) NOT NULL,
	`last_name` VARCHAR(40) NOT NULL,
	`email` VARCHAR(40) NOT NULL,
	PRIMARY KEY (`instructor_id`)
);

ALTER TABLE `bootcamp_students` ADD CONSTRAINT `bootcamp_students_fk0` FOREIGN KEY (`project_id`) REFERENCES `business`(`project_id`);

ALTER TABLE `bootcamp_students` ADD CONSTRAINT `bootcamp_students_fk1` FOREIGN KEY (`instructor_id`) REFERENCES `bootcamp_instructors`(`instructor_id`);