CREATE DATABASE musify_db;

CREATE TABLE `Products` (
	id INTEGER NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(255) NOT NULL,
	price FLOAT NOT NULL,
	discount DECIMAL(5,2),
	producer VARCHAR(255) NOT NULL,
	product_description VARCHAR(255),
	product_image VARCHAR(2048),
	popularity INTEGER,
	PRIMARY KEY (id),
	FOREIGN KEY (users_id) REFERENCES Users(id)
	FOREIGN KEY (genre_id) REFERENCES Genres(id)
);

CREATE TABLE `Users` (
	id INTEGER NOT NULL AUTO_INCREMENT,
	first_name NVARCHAR(64) NOT NULL,
	last_name NVARCHAR(64) NOT NULL,
	email VARCHAR(320) NOT NULL UNIQUE,
	password VARCHAR(64) NOT NULL,
	description_producer VARCHAR(255),
	image_producer VARCHAR(2048),
	PRIMARY KEY (id)
	FOREIGN KEY (category_id) REFERENCES User_category(id)
);

CREATE TABLE `Genres` (
	id INTEGER NOT NULL AUTO_INCREMENT,
	genre_name NVARCHAR(32) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE `User_category` (
	id INTEGER NOT NULL AUTO_INCREMENT,
	user_type NVARCHAR(32) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE `Cart` (
	id INTEGER NOT NULL AUTO_INCREMENT,
	price FLOAT NOT NULL,
	PRIMARY KEY (id)
	FOREIGN KEY (users_id) REFERENCES Users(id),
	FOREIGN KEY (products_id) REFERENCES Products(id)
);