ALTER TABLE if exists  sodium_demo.user_roles
    DROP CONSTRAINT if exists user_roles_fk1;

ALTER TABLE if exists  sodium_demo.roles
    DROP CONSTRAINT if exists roles_fk1;

ALTER TABLE if exists  sodium_demo.provinces
    DROP CONSTRAINT if exists provinces_fk1;

ALTER TABLE if exists  sodium_demo.countries
    DROP CONSTRAINT if exists countries_fk1;

ALTER TABLE if exists  sodium_demo.counties
    DROP CONSTRAINT if exists counties_fk1;

ALTER TABLE if exists  sodium_demo.cars
    DROP CONSTRAINT if exists cars_fk1;

ALTER TABLE if exists  sodium_demo.cars
    DROP CONSTRAINT if exists cars_fk2;

ALTER TABLE if exists  sodium_demo.cars
    DROP CONSTRAINT if exists cars_fk3;

ALTER TABLE if exists  sodium_demo.cars
    DROP CONSTRAINT if exists cars_fk4;
    
ALTER TABLE if exists  sodium_demo.DEPS_DETAILS
    DROP CONSTRAINT if exists DEPS_DETAILS_fk1;
   
ALTER TABLE if exists  sodium_demo.DEPS_DETAILS
    DROP CONSTRAINT if exists DEPS_DETAILS_fk2;
    
ALTER TABLE if exists  sodium_demo.DEPS_DETAILS
    DROP CONSTRAINT if exists DEPS_DETAILS_fk3;
   
ALTER TABLE if exists  sodium_demo.emp_details
    DROP CONSTRAINT if exists emp_details_fk1;

ALTER TABLE if exists  sodium_demo.employee_photo
    DROP CONSTRAINT if exists employee_photo_fk1;

ALTER TABLE if exists  sodium_demo.employees
    DROP CONSTRAINT if exists employees_fk1;


drop table if exists  sodium_demo.cars ;
drop table if exists  sodium_demo.COLORS ;
drop table if exists  sodium_demo.COUNTIES;
drop table if exists  sodium_demo.COUNTRIES;  
drop table if exists  sodium_demo.DEPS;  
drop table if exists  sodium_demo.DEPS_DETAILS;  
drop table if exists  sodium_demo.EMP_DETAILS;  
drop table if exists  sodium_demo.EMPLOYEE_PHOTO;  
drop table if exists  sodium_demo.EMPLOYEES;  
drop table if exists  sodium_demo.PROVINCES;  
drop table if exists  sodium_demo.REGIONS; 
drop table if exists  sodium_demo.ROLES; 
drop table if exists  sodium_demo.USER_ROLES;
drop table if exists  sodium_demo.USERS;
drop SEQUENCE if exists   sodium_demo.htsql;
drop SCHEMA if exists sodium_demo;

CREATE SCHEMA sodium_demo AUTHORIZATION postgres;
    
CREATE SEQUENCE  sodium_demo.htsql;

CREATE TABLE  sodium_demo.cars 
   (	CAR_ID numeric not null primary key, 
	EMP_ID numeric not null, 
	CAR_YEAR character varying(20), 
	CAR_MAKE character varying(20), 
	COLOR_ID numeric, 
	PROVINCE_ID numeric, 
	COUNTY_ID numeric, 
	CAR_PHOTO numeric
   ) ;

CREATE TABLE  sodium_demo.COLORS 
   (	COLOR_ID numeric not null PRIMARY KEY , 
	COLOR_NAME character varying(20) not null
   ) ;

CREATE TABLE  sodium_demo.COUNTIES 
   (	COUNTY_ID numeric not null PRIMARY KEY, 
	COUNTY_NAME character varying(20) not null, 
	PROVINCE_ID numeric not null
   ) ;

CREATE TABLE  sodium_demo.COUNTRIES 
   (	COUNTRY_ID character varying(2) not null PRIMARY KEY , 
	COUNTRY_NAME character varying(40) not null, 
	REGION_ID numeric not null
   ) ;

CREATE TABLE  sodium_demo.DEPS 
   (	DEP_ID numeric not null primary key, 
	DEP_NAME character varying(20) not null
   ) ;

CREATE TABLE  sodium_demo.DEPS_DETAILS 
   (	DEP_ID numeric not null primary key, 
	PROVINCE_ID numeric , 
	COUNTY_ID numeric , 
	ADDRESS character varying(200), 
	fax_number character varying(20), 
	DEP_LOGO numeric
   ) ;

CREATE TABLE  sodium_demo.EMP_DETAILS 
   (	EMP_ID numeric not null primary key, 
	BIRTH_DATE DATE, 
	BIRTH_PLACE numeric
   ) ;


CREATE TABLE  sodium_demo.EMPLOYEE_PHOTO 
   (	EMP_ID numeric not null primary key, 
	EMPLOYEE_PHOTO numeric
   ) ;

CREATE TABLE  sodium_demo.EMPLOYEES 
   (	EMP_ID numeric not null primary key,  
	EMP_NAME character varying(20) not null, 
	EMP_SURNAME character varying(20) not null, 
	DEP_ID numeric not null, 
	EMP_IS_BOSS character varying(1), 
	GENDER character varying(10), 
	HAS_CAR character varying(1)
   ) ;


CREATE TABLE  sodium_demo.PROVINCES 
   (	PROVINCE_ID numeric not null primary key,  
	PROVINCE_NAME character varying(20) not null, 
	COUNTRY_ID character varying(2) not null
   ) ;

CREATE TABLE  sodium_demo.REGIONS 
   (	REGION_ID numeric not null primary key,  
	REGION_NAME character varying(25) not null 
   ) ;

CREATE TABLE  sodium_demo.ROLES 
   (	ROLE_NAME character varying(20) not null primary key  
   ) ;

CREATE TABLE  sodium_demo.USER_ROLES 
   (	USER_NAME character varying(20)  not null, 
	ROLE_NAME character varying(20)  not null, 
    primary key(user_name, role_name)
   ) ;

CREATE TABLE  sodium_demo.USERS 
   (	USER_NAME character varying(20) not null primary key  , 
	PASSWORD character varying(20) not null
   ) ;

  
ALTER TABLE  sodium_demo.user_roles
    ADD CONSTRAINT user_roles_fk1 FOREIGN KEY (user_name)
    REFERENCES  sodium_demo.users (user_name) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  sodium_demo.roles
    ADD CONSTRAINT roles_fk1 FOREIGN KEY (role_name)
    REFERENCES  sodium_demo.roles (role_name) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  sodium_demo.provinces
    ADD CONSTRAINT provinces_fk1 FOREIGN KEY (country_id)
    REFERENCES  sodium_demo.countries (country_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  sodium_demo.countries
    ADD CONSTRAINT countries_fk1 FOREIGN KEY (region_id)
    REFERENCES  sodium_demo.regions (region_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  sodium_demo.counties
    ADD CONSTRAINT counties_fk1 FOREIGN KEY (province_id)
    REFERENCES  sodium_demo.provinces (province_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  sodium_demo.cars
    ADD CONSTRAINT cars_fk1 FOREIGN KEY (color_id)
    REFERENCES  sodium_demo.colors (color_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  sodium_demo.cars
    ADD CONSTRAINT cars_fk2 FOREIGN KEY (province_id)
    REFERENCES  sodium_demo.provinces (province_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  sodium_demo.cars
    ADD CONSTRAINT cars_fk3 FOREIGN KEY (county_id)
    REFERENCES  sodium_demo.counties (county_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  sodium_demo.cars
    ADD CONSTRAINT cars_fk4 FOREIGN KEY (emp_id)
    REFERENCES  sodium_demo.employees (emp_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
    
ALTER TABLE  sodium_demo.deps_details
    ADD CONSTRAINT deps_details_fk1 FOREIGN KEY (dep_id)
    REFERENCES  sodium_demo.deps (dep_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  sodium_demo.deps_details
    ADD CONSTRAINT deps_details_fk2 FOREIGN KEY (province_id)
    REFERENCES  sodium_demo.provinces (province_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  sodium_demo.deps_details
    ADD CONSTRAINT deps_details_fk3 FOREIGN KEY (county_id)
    REFERENCES  sodium_demo.counties (county_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
   
ALTER TABLE  sodium_demo.emp_details
    ADD CONSTRAINT emp_details_fk1 FOREIGN KEY (emp_id)
    REFERENCES  sodium_demo.employees (emp_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
    
ALTER TABLE  sodium_demo.employee_photo
    ADD CONSTRAINT employee_photo_fk1 FOREIGN KEY (emp_id)
    REFERENCES  sodium_demo.employees (emp_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
    
ALTER TABLE  sodium_demo.employees
    ADD CONSTRAINT employees_fk1 FOREIGN KEY (dep_id)
    REFERENCES  sodium_demo.deps (dep_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
    
Insert into  sodium_demo.ROLES (ROLE_NAME) values ('ADMIN');
Insert into  sodium_demo.USERS (USER_NAME,PASSWORD) values ('admin','1234');
Insert into  sodium_demo.USER_ROLES (USER_NAME,ROLE_NAME) values ('admin','ADMIN');

commit;





