CREATE DATABASE musifydb;

CREATE TABLE ´Products´ (
	products_id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	price FLOAT NOT NULL,
	discount DECIMAL(5,2),
	producer VARCHAR(255) NOT NULL,
	genre VARCHAR(255),
	description_product VARCHAR(255),
	image_product VARCHAR(2048),
	popularity INTEGER,
	PRIMARY KEY (products_id),
	FOREIGN KEY (users_id) REFERENCES Users(users_id)
);

CREATE TABLE `Users` (
	users_id INTEGER NOT NULL AUTO_INCREMENT,
	first_name NVARCHAR(64) NOT NULL,
	last_name NVARCHAR(64) NOT NULL,
	email VARCHAR(320) NOT NULL UNIQUE,
	password VARCHAR(64) NOT NULL,
	category VARCHAR(32) NOT NULL,
	description_producer VARCHAR(255),
	image_producer VARCHAR(2048),
	admin_privilege BOOLEAN,
	PRIMARY KEY (users_id)
);