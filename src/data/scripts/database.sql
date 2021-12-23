DROP DATABASE IF EXISTS musify_db;
CREATE DATABASE musify_db;
USE musify_db;

DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Products` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`product_name` VARCHAR(255) NOT NULL,
	`price` FLOAT NOT NULL,
	`discount` DECIMAL(5,2),
	`producer` VARCHAR(255) NOT NULL,
	`product_description` VARCHAR(255),
	`product_image` VARCHAR(2048),
	`popularity` INTEGER,
	`users_id` NOT NULL AUTO_INCREMENT, 
	`genre_id` NOT NULL AUTO_INCREMENT, 
	PRIMARY KEY (`id`),
	FOREIGN KEY (`users_id`) REFERENCES `Users`(`id`)
	FOREIGN KEY (`genre_id`) REFERENCES `Genres`(`id`)
);

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`first_name` NVARCHAR(64) NOT NULL,
	`last_name` NVARCHAR(64) NOT NULL,
	`email` VARCHAR(320) NOT NULL UNIQUE,
	`password` VARCHAR(64) NOT NULL,
	`description_producer` VARCHAR(255),
	`image_producer` VARCHAR(2048),
	`category_id` NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
	FOREIGN KEY (`category_id`) REFERENCES `User_category`(`id`)
);

DROP TABLE IF EXISTS `Genres`;
CREATE TABLE `Genres` (
	id INTEGER NOT NULL AUTO_INCREMENT,
	`genre_name` NVARCHAR(32) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `User_category`;
CREATE TABLE `User_category` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`user_type` NVARCHAR(32) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Cart`;
CREATE TABLE `Cart` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`price` FLOAT NOT NULL,
	`users_id` NOT NULL AUTO_INCREMENT,
	`products_id` NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
	FOREIGN KEY (`users_id`) REFERENCES `Users`(`id`),
	FOREIGN KEY (`products_id`) REFERENCES `Products`(`id`)
);