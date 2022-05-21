CREATE TABLE `projects` (
	`project_id` int NOT NULL AUTO_INCREMENT,
	`project_files` varchar(100),
	`file_name` varchar(100),
	`contact_person` varchar(40) NOT NULL,
	`business_name` varchar(40) NOT NULL,
	`email` varchar(40) NOT NULL,
	`phone` varchar(15) NOT NULL,
	`created_at` DATETIME NOT NULL,
	`completed` BOOLEAN NOT NULL,
	`accepted` BOOLEAN NOT NULL,
	`assigned` BOOLEAN ,
	PRIMARY KEY (`project_id`)
);

CREATE TABLE `bootcamp_students` (
	`student_id` int NOT NULL AUTO_INCREMENT,
	`first_name` varchar(40) NOT NULL,
	`last_name` varchar(40) NOT NULL,
	`email` varchar(40) NOT NULL,
	`project_id` int,
	`instructor_id` int,
	PRIMARY KEY (`student_id`)
);

CREATE TABLE `bootcamp_instructors` (
	`instructor_id` int NOT NULL AUTO_INCREMENT,
	`first_name` varchar(40) NOT NULL,
	`last_name` varchar(40) NOT NULL,
	`email` varchar(40) NOT NULL,
	PRIMARY KEY (`instructor_id`)
);

ALTER TABLE `bootcamp_students` ADD CONSTRAINT `bootcamp_students_fk0` FOREIGN KEY (`project_id`) REFERENCES `projects`(`project_id`);

ALTER TABLE `bootcamp_students` ADD CONSTRAINT `bootcamp_students_fk1` FOREIGN KEY (`instructor_id`) REFERENCES `bootcamp_instructors`(`instructor_id`);



