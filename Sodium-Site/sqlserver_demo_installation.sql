USE master;

ALTER DATABASE sodium_demo SET SINGLE_USER WITH ROLLBACK IMMEDIATE;

drop database if exists sodium_demo;

CREATE DATABASE sodium_demo;

use sodium_demo;

CREATE SEQUENCE  htsql;

CREATE TABLE  cars 
   (	CAR_ID numeric not null primary key, 
	EMP_ID numeric not null, 
	CAR_YEAR character varying(20), 
	CAR_MAKE character varying(20), 
	COLOR_ID numeric, 
	PROVINCE_ID numeric, 
	COUNTY_ID numeric, 
	CAR_PHOTO numeric
   ) ;

CREATE TABLE  COLORS 
   (	COLOR_ID numeric not null PRIMARY KEY , 
	COLOR_NAME character varying(20) not null
   ) ;

CREATE TABLE  COUNTIES 
   (	COUNTY_ID numeric not null PRIMARY KEY, 
	COUNTY_NAME character varying(20) not null, 
	PROVINCE_ID numeric not null
   ) ;

CREATE TABLE  COUNTRIES 
   (	COUNTRY_ID character varying(2) not null PRIMARY KEY , 
	COUNTRY_NAME character varying(40) not null, 
	REGION_ID numeric not null
   ) ;

CREATE TABLE  DEPS 
   (	DEP_ID numeric not null primary key, 
	DEP_NAME character varying(20) not null
   ) ;

CREATE TABLE  DEPS_DETAILS 
   (	DEP_ID numeric not null primary key, 
	PROVINCE_ID numeric , 
	COUNTY_ID numeric , 
	ADDRESS character varying(200), 
	fax_number character varying(20), 
	DEP_LOGO numeric
   ) ;

CREATE TABLE  EMP_DETAILS 
   (	EMP_ID numeric not null primary key, 
	BIRTH_DATE DATE, 
	BIRTH_PLACE numeric
   ) ;


CREATE TABLE  EMPLOYEE_PHOTO 
   (	EMP_ID numeric not null primary key, 
	EMPLOYEE_PHOTO numeric
   ) ;

CREATE TABLE  EMPLOYEES 
   (	EMP_ID numeric not null primary key,  
	EMP_NAME character varying(20) not null, 
	EMP_SURNAME character varying(20) not null, 
	DEP_ID numeric not null, 
	EMP_IS_BOSS character varying(1), 
	GENDER character varying(10), 
	HAS_CAR character varying(1)
   ) ;


CREATE TABLE  PROVINCES 
   (	PROVINCE_ID numeric not null primary key,  
	PROVINCE_NAME character varying(20) not null, 
	COUNTRY_ID character varying(2) not null
   ) ;

CREATE TABLE  REGIONS 
   (	REGION_ID numeric not null primary key,  
	REGION_NAME character varying(25) not null 
   ) ;

CREATE TABLE  ROLES 
   (	ROLE_NAME character varying(20) not null primary key  
   ) ;

CREATE TABLE  USER_ROLES 
   (	USER_NAME character varying(20)  not null, 
	ROLE_NAME character varying(20)  not null, 
    primary key(user_name, role_name)
   ) ;

CREATE TABLE  USERS 
   (	USER_NAME character varying(20) not null primary key  , 
	PASSWORD character varying(20) not null
   ) ;

  
ALTER TABLE  user_roles
    ADD CONSTRAINT user_roles_fk1 FOREIGN KEY (user_name)
    REFERENCES  users (user_name)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  roles
    ADD CONSTRAINT roles_fk1 FOREIGN KEY (role_name)
    REFERENCES  roles (role_name)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  provinces
    ADD CONSTRAINT provinces_fk1 FOREIGN KEY (country_id)
    REFERENCES  countries (country_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  countries
    ADD CONSTRAINT countries_fk1 FOREIGN KEY (region_id)
    REFERENCES  regions (region_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  counties
    ADD CONSTRAINT counties_fk1 FOREIGN KEY (province_id)
    REFERENCES  provinces (province_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  cars
    ADD CONSTRAINT cars_fk1 FOREIGN KEY (color_id)
    REFERENCES  colors (color_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  cars
    ADD CONSTRAINT cars_fk2 FOREIGN KEY (province_id)
    REFERENCES  provinces (province_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  cars
    ADD CONSTRAINT cars_fk3 FOREIGN KEY (county_id)
    REFERENCES  counties (county_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  cars
    ADD CONSTRAINT cars_fk4 FOREIGN KEY (emp_id)
    REFERENCES  employees (emp_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
    
ALTER TABLE  deps_details
    ADD CONSTRAINT deps_details_fk1 FOREIGN KEY (dep_id)
    REFERENCES  deps (dep_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  deps_details
    ADD CONSTRAINT deps_details_fk2 FOREIGN KEY (province_id)
    REFERENCES  provinces (province_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  deps_details
    ADD CONSTRAINT deps_details_fk3 FOREIGN KEY (county_id)
    REFERENCES  counties (county_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
   
ALTER TABLE  emp_details
    ADD CONSTRAINT emp_details_fk1 FOREIGN KEY (emp_id)
    REFERENCES  employees (emp_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
    
ALTER TABLE  employee_photo
    ADD CONSTRAINT employee_photo_fk1 FOREIGN KEY (emp_id)
    REFERENCES  employees (emp_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
    
ALTER TABLE  employees
    ADD CONSTRAINT employees_fk1 FOREIGN KEY (dep_id)
    REFERENCES  deps (dep_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
    
Insert into  ROLES (ROLE_NAME) values ('ADMIN');
Insert into  USERS (USER_NAME,PASSWORD) values ('admin','1234');
Insert into  USER_ROLES (USER_NAME,ROLE_NAME) values ('admin','ADMIN');






