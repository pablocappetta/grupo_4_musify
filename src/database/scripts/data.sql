DELETE FROM musify_db.cart;
ALTER TABLE musify_db.cart AUTO_INCREMENT=1;

DELETE FROM musify_db.products;
ALTER TABLE musify_db.products AUTO_INCREMENT=1;

DELETE FROM musify_db.users;
ALTER TABLE musify_db.users AUTO_INCREMENT=1;

DELETE FROM musify_db.user_category;
ALTER TABLE musify_db.user_category AUTO_INCREMENT=1;

DELETE FROM musify_db.genres;
ALTER TABLE musify_db.genres AUTO_INCREMENT=1;


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


INSERT INTO musify_db.users (id,
							first_name, 
							last_name, 
							email, 
							password, 
							description_producer, 
							image_producer, 
							category_id) VALUES 
(1,"Gustavo","Cerati","g.cerati@gmail.com", "12345", "Gustavo Cerati, iconic music producer from Argentina.", "1_producerUser.jpg", 1 ),
(2,"Carlos","Maslatón","colemanch@gmail.com", "100barrani", "Charlie is a rising star from South America, you must procede.", "2_producerUser.jpg", 2);


INSERT INTO musify_db.products(id, 
								product_name, 
								price, 
								discount, 
								producer, 
								product_description, 
								product_image, 
								popularity, 
								users_id, 
								genre_id) VALUES
(1, "Flow", 8.99, 10, "Soundscrapes","Keeping a beat interesting is one of the most important parts of production. Flow was designed to add ear candy to your beats. Stand out and add energy and excitement to your music just by dragging and dropping. This is one of the several samples made by Soundscrapes producers.", "article10.jpg", 9, 1, 1),
(2, "Trap King", 19.99, 25, "Snoop Dog","Trap King is the latest installment from Soundscrapes inspired by modern Trap music. This edition includes drums, 808s, loops, MIDIs and voice samples from Duki that will be sure to help you create crazy beats! This kit is a must-have as it will quickly become your favorite go-to when making beats.", "article11.jpg", 8, 2, 2), 
(3, "After Hour", 39.99, 0, "Carlos Maslatón","Are you in love with tech house as we are? then look no further, this is the sample pack that will help you to compose profesional tech house. Don't forget to follow us on ILoveFunctionLoops.dot.com", "article12.jpg", 7, 1, 3),
(4, "Rugged Trap Essentials", 17.99, 0, "Kygo","Did you hear about Eminem's return? Let me tell you that without The Astro that couldn't be possible. Don't forget to follow us on ILoveFunctionLoops.dot.com", "article13.jpg", 6, 2, 4),
(5, "Adhera Records Vol.1", 59.99, 50, "Solomun","Recommended by artists like Marc Ribellet, this is the famous Sample Pack Vol. 1 from the famous producer Solomun", "article14.jpg", 5, 1, 5);


INSERT INTO musify_db.cart(id, price, users_id) VALUES
(1, 8.99, 1), 
(2, 19.99, 2), 
(3, 3.99, 2), 
(4, 17.99, 1), 
(5, 59.99, 2);