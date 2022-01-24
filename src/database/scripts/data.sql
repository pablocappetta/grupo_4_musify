DELETE FROM musify_db.user_category;
ALTER TABLE musify_db.user_category AUTO_INCREMENT=1;

DELETE FROM musify_db.genres;
ALTER TABLE musify_db.genres AUTO_INCREMENT=1;

DELETE FROM musify_db.users;
ALTER TABLE musify_db.users AUTO_INCREMENT=1;

DELETE FROM musify_db.products;
ALTER TABLE musify_db.products AUTO_INCREMENT=1;

DELETE FROM musify_db.cart;
ALTER TABLE musify_db.cart AUTO_INCREMENT=1;

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
("1John","1Fisherman","fishermansito@gmail.com", "12345", "Fisherman from New Zeland is a producer cool ride shape", "1_producerUser.jpg", 1 ),
("Charlie","Coleman","colemanch@gmail.com", "nave12", "Charlie is from US", "2_producerUser.jpg", 2);

INSERT INTO musify_db.products(id, product_name ,price,discount,producer,
								product_description,product_image,
								popularity ,users_id ,genre_id) VALUES
(1, "Chill Samples", 39.99, 1, "Snoop Dog1","Single ver sound Snoop Dog1", "article10.jpg", 9, 1, 1),
(2, "Chill Samples", 39.98, 2, "Snoop Dog2","Single ver sound Snoop Dog2", "article11.jpg", 8, 2, 2), 
(3, "Chill Samples", 39.97, 3, "Snoop Dog3","Single ver sound Snoop Dog3", "article12.jpg", 7, 3, 3),
(4, "Chill Samples", 39.96, 4, "Snoop Dog4","Single ver sound Snoop Dog4", "article13.jpg", 6, 4, 4),
(5, "Chill Samples", 39.95, 5, "Snoop Dog5","Single ver sound Snoop Dog5", "article14.jpg", 5, 5, 5);


INSERT INTO musify_db.cart(id, price, products_id, users_id) VALUES
(1, 8.20, 1, 1), 
(2, 8.20, 2, 2), 
(3, 8.20, 3, 3), 
(4, 8.20, 4, 4), 
(5, 8.20, 5, 5);








 