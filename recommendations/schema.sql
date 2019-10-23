DROP DATABASE IF EXISTS recommendations;
CREATE DATABASE recommendations;

USE recommendations;

CREATE TABLE homes (id int NOT NULL auto_increment,
  homeType varchar(100), 
  title varchar(100),
  price decimal(5,2),
  reviewCount varchar(20),
  rating decimal(3,2),
  primary key (id));
  -- create tables first without foreign keys and then connect them later 


CREATE TABLE pictures (id int NOT NULL auto_increment,
  url varchar(500),
  primary key (id));


CREATE TABLE cities (id int NOT NULL auto_increment, 
cityName varchar(100), 
stateName varchar(50), 
country varchar(100),
primary key (id));


-- CREATE TABLE pictures_homes


CREATE TABLE users (id int NOT NULL auto_increment, 
userName varchar(100),
primary key (id));


-- INSERT INTO movies(title) VALUES ("Mean Girls"),("Hackers"),("The Grey"),("Sunshine"),("Ex Machina");
