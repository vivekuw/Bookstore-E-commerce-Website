-- user regrister form table
CREATE TABLE `test`.`user` (`user_id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , PRIMARY KEY (`user_id`)) ENGINE = InnoDB;

-- contact from table

CREATE TABLE `test`.`contact_form` (`contact_id` INT NOT NULL AUTO_INCREMENT , `firstname` VARCHAR(255) NOT NULL , `lastname` VARCHAR(255) NOT NULL , `contact` BIGINT NOT NULL , `subject` VARCHAR(255) NOT NULL , PRIMARY KEY (`contact_id`)) ENGINE = InnoDB;

-- table of books
//spirtiual
CREATE TABLE `test`.`spirituality` (`product_id` INT(11) NOT NULL AUTO_INCREMENT , `product_name` VARCHAR(255) NOT NULL , `product_price` DECIMAL(8,2) NOT NULL , `product_image` VARCHAR(255) NOT NULL , `quantity` INT(11) NOT NULL , PRIMARY KEY (`product_id`)) ENGINE = InnoDB;
INSERT INTO `spirituality` (`product_id`, `product_name`, `product_price`, `product_image`, `quantity`) VALUES ('1', 'Ram Charitmanas', '350', 'images-1.jpg', '10'), ('2', 'Shiv Mahapuran', '456', 'images-2.jpg', '10') ,('3', 'Bhagavad Gita', '550', 'images-3.jpg', '10'), ('4', 'Vedas', '896', 'images-4.jpg', '10');

// motivation
CREATE TABLE `test`.`motivation` (`product_id` INT(11) NOT NULL AUTO_INCREMENT , `product_name` VARCHAR(255) NOT NULL , `product_price` DECIMAL(8,2) NOT NULL , `product_image` VARCHAR(255) NOT NULL , `quantity` INT(11) NOT NULL , PRIMARY KEY (`product_id`)) ENGINE = InnoDB;
INSERT INTO `motivation` (`product_id`, `product_name`, `product_price`, `product_image`, `quantity`) VALUES ('5', 'A Man of the World ', '526', 'images-5.jpg', '10'), ('6', 'Big Magic', '853', 'images-6.jpg', '10'), ('7', 'The Art of Happiness', '632', 'images-7.jpg', '10'), ('8', 'The American Spirit', '152', 'images-8.jpg', '10'), 
('9', 'The Alchemist', '451', 'images-9.jpg', '10'), ('10', 'The 5 Second Rule', '698', 'images-10.jpg', '10');
