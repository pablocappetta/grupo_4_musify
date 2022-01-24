-- Aclaration: you must delete all table with relationship first
-- example: you cant delete first genres table because when you want
-- delete product table genre_id dosnt exist

DELETE FROM musify_db.products;
ALTER TABLE musify_db.products AUTO_INCREMENT=1;

DELETE FROM musify_db.genres;
ALTER TABLE musify_db.genres AUTO_INCREMENT=1;

DELETE FROM musify_db.users;
ALTER TABLE musify_db.users AUTO_INCREMENT=1;

DELETE FROM musify_db.user_category;
ALTER TABLE musify_db.user_category AUTO_INCREMENT=1;

DELETE FROM musify_db.cart;
ALTER TABLE musify_db.cart AUTO_INCREMENT=1;


-- Insert value into tables

INSERT INTO musify_db.user_category (id, user_type) VALUES 
(1, "Seller"),
(2, "Buyer");

INSERT INTO musify_db.genres (id, genre_name) VALUES
(1, "Rock"), 
(2, "Trap"), 
(3, "Techouse"),
(4, "Tropical"),
(5, "Hip Hop"),
(6, "Ambient"),
(7, "Metal");

INSERT INTO musify_db.users (first_name, last_name, email, password, description_producer, image_producer, category_id) VALUES 
("John","Fisherman","fisherman@gmail.com", "12345", "Fisherman from New Zeland is a producer cool ride shape", "1_producerUser.jpg", 1),
("Charlie","Coleman","colemanch@gmail.com", "nave12", "Charlie is from US", "2_producerUser.jpg", 2);

INSERT INTO musify_db.products(id, product_name ,price,discount,producer,
								product_description,product_image,
								popularity ,users_id ,genre_id) VALUES
(1, "Flow", 3.99, 10, "Asonic","Single ver sound Asonic", "article10.jpg", 9, 1, 1),
(2, "Trap King", 4.16, 5, "Snoop Dog","Single ver sound Snoop Dog", "article11.jpg", 8, 2, 2), 
(3, "After Hour", 8.85, 10, "Mike Tomson","Single ver sound Mike Tomson", "article12.jpg", 7, 1, 3),
(4, "Smashed", 6.25, 15, "John Musk","Single ver sound John Musk", "article13.jpg", 6, 1, 4),
(5, "Rugged trap Essentials 2", 5.20, 20, "James Cew","Single ver sound James Cew", "article14.jpg", 5, 2, 5);


INSERT INTO musify_db.cart(id, price, users_id) VALUES
(1, 8.20, 1), 
(2, 8.20, 2), 
(3, 8.20, 1), 
(4, 8.20, 2), 
(5, 8.20, 1);








 