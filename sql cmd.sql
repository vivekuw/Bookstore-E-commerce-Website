-- user regrister form table
CREATE TABLE `test`.`user` (`user_id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , PRIMARY KEY (`user_id`)) ENGINE = InnoDB;

-- contact from table

CREATE TABLE `test`.`contact_form` (`contact_id` INT NOT NULL AUTO_INCREMENT , `firstname` VARCHAR(255) NOT NULL , `lastname` VARCHAR(255) NOT NULL , `contact` BIGINT NOT NULL , `subject` VARCHAR(255) NOT NULL , PRIMARY KEY (`contact_id`)) ENGINE = InnoDB;

-- product table

CREATE TABLE `product` ( `product_id` int(20) NOT NULL, `product_name` varchar(120) NOT NULL, `product_brand` varchar(100) NOT NULL, `product_price` decimal(8,2) NOT NULL, `product_image` varchar(100) NOT NULL, `product_quantity` mediumint(5) NOT NULL, `product_status` enum('0','1') NOT NULL COMMENT '0-active,1-inactive' ) ENGINE=MyISAM DEFAULT CHARSET=utf8;


//1
insert into product (product_id,product_name,product_brand,product_price,product_image,product_quantity,product_status)
values(1,'TrueDSight','David Stahler Jr.',255,'image-1.jpeg',10,1);

//2
insert into product (product_id,product_name,product_brand,product_price,product_image,product_quantity,product_status)
values(2,'Living on Luck','Charles Bukowski',766,'image-2.jpeg',10,1);

//3
insert into product (product_id,product_name,product_brand,product_price,product_image,product_quantity,product_status)
values(3,'Little Big','John Crowley',1050,'image-3.jpeg',10,1);

//4
insert into product (product_id,product_name,product_brand,product_price,product_image,product_quantity,product_status)
values(4,'Less than zero','Bret Easton Ellis',526,'image-4.jpeg',10,1);

//5
insert into product (product_id,product_name,product_brand,product_price,product_image,product_quantity,product_status)
values(5,'Less than zero',' Armistead Maupin',956,'image-5.jpeg',10,1);