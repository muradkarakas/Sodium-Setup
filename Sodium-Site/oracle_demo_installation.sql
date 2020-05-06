--------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------
--------  SCHEMA USER CREATION
--------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------

alter session set "_ORACLE_SCRIPT"=true;

CREATE USER SODIUM_DEMO IDENTIFIED BY 1234;
GRANT "CONNECT" TO SODIUM_DEMO ;
GRANT "RESOURCE" TO SODIUM_DEMO ;

ALTER USER SODIUM_DEMO quota unlimited on USERS;

--------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------
--------  SCHEMA OBJECTS
--------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------

CREATE SEQUENCE  "SODIUM_DEMO"."HTSQL"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE ;

--------------------------------------------------------
--  DDL for Table CARS
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."CARS" 
   (	"CAR_ID" NUMBER, 
	"EMP_ID" NUMBER, 
	"CAR_YEAR" VARCHAR2(20), 
	"CAR_MAKE" VARCHAR2(20), 
	"COLOR_ID" NUMBER, 
	"PROVINCE_ID" NUMBER, 
	"COUNTY_ID" NUMBER, 
	"CAR_PHOTO" BLOB
   ) ;
--------------------------------------------------------
--  DDL for Table COLORS
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."COLORS" 
   (	"COLOR_ID" NUMBER, 
	"COLOR_NAME" VARCHAR2(20)
   ) ;
--------------------------------------------------------
--  DDL for Table COUNTIES
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."COUNTIES" 
   (	"COUNTY_ID" VARCHAR2(20), 
	"COUNTY_NAME" VARCHAR2(20), 
	"PROVINCE_ID" NUMBER
   ) ;
--------------------------------------------------------
--  DDL for Table COUNTRIES
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."COUNTRIES" 
   (	"COUNTRY_ID" VARCHAR2(2), 
	"COUNTRY_NAME" VARCHAR2(40), 
	"REGION_ID" NUMBER
   ) ;
--------------------------------------------------------
--  DDL for Table DEPS
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."DEPS" 
   (	"DEP_ID" NUMBER, 
	"DEP_NAME" VARCHAR2(50)
   ) ;
--------------------------------------------------------
--  DDL for Table DEPS_DETAILS
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."DEPS_DETAILS" 
   (	"DEP_ID" NUMBER, 
	"PROVINCE_ID" NUMBER, 
	"COUNTY_ID" NUMBER, 
	"ADDRESS" VARCHAR2(200), 
	"FAX_NUMBER" VARCHAR2(20), 
	"DEP_LOGO" BLOB
   ) ;
--------------------------------------------------------
--  DDL for Table EMP_DETAILS
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."EMP_DETAILS" 
   (	"EMP_ID" NUMBER, 
	"BIRTH_DATE" DATE, 
	"BIRTH_PLACE" NUMBER
   ) ;
--------------------------------------------------------
--  DDL for Table EMPLOYEE_PHOTO
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."EMPLOYEE_PHOTO" 
   (	"EMP_ID" NUMBER, 
	"EMPLOYEE_PHOTO" BLOB
   ) ;
--------------------------------------------------------
--  DDL for Table EMPLOYEES
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."EMPLOYEES" 
   (	"EMP_ID" NUMBER, 
	"EMP_NAME" VARCHAR2(20), 
	"EMP_SURNAME" VARCHAR2(20), 
	"DEP_ID" NUMBER, 
	"EMP_IS_BOSS" VARCHAR2(1), 
	"GENDER" VARCHAR2(10), 
	"HAS_CAR" VARCHAR2(1)
   ) ;
--------------------------------------------------------
--  DDL for Table PROVINCES
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."PROVINCES" 
   (	"PROVINCE_ID" NUMBER, 
	"PROVINCE_NAME" VARCHAR2(20), 
	"COUNTRY_ID" VARCHAR2(2)
   ) ;
--------------------------------------------------------
--  DDL for Table REGIONS
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."REGIONS" 
   (	"REGION_ID" NUMBER, 
	"REGION_NAME" VARCHAR2(25)
   ) ;
--------------------------------------------------------
--  DDL for Table ROLES
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."ROLES" 
   (	"ROLE_NAME" VARCHAR2(20)
   ) ;
--------------------------------------------------------
--  DDL for Table USER_ROLES
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."USER_ROLES" 
   (	"USER_NAME" VARCHAR2(20), 
	"ROLE_NAME" VARCHAR2(20)
   ) ;
--------------------------------------------------------
--  DDL for Table USERS
--------------------------------------------------------

  CREATE TABLE "SODIUM_DEMO"."USERS" 
   (	"USER_NAME" VARCHAR2(20), 
	"PASSWORD" VARCHAR2(20)
   ) ;
--------------------------------------------------------
--  DDL for Index CARS_ID
--------------------------------------------------------

  CREATE UNIQUE INDEX "SODIUM_DEMO"."CARS_ID" ON "SODIUM_DEMO"."CARS" ("CAR_ID") 
  ;
--------------------------------------------------------
--  DDL for Index CARS_INDEX1
--------------------------------------------------------

  CREATE INDEX "SODIUM_DEMO"."CARS_INDEX1" ON "SODIUM_DEMO"."CARS" ("EMP_ID") 
  ;
--------------------------------------------------------
--  DDL for Index RENKLER_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SODIUM_DEMO"."RENKLER_PK" ON "SODIUM_DEMO"."COLORS" ("COLOR_ID") 
  ;
--------------------------------------------------------
--  DDL for Index COUNTIES_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SODIUM_DEMO"."COUNTIES_PK" ON "SODIUM_DEMO"."COUNTIES" ("COUNTY_ID") 
  ;
--------------------------------------------------------
--  DDL for Index COUNTRIES_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SODIUM_DEMO"."COUNTRIES_PK" ON "SODIUM_DEMO"."COUNTRIES" ("COUNTRY_ID") 
  ;
--------------------------------------------------------
--  DDL for Index DEPS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SODIUM_DEMO"."DEPS_PK" ON "SODIUM_DEMO"."DEPS" ("DEP_ID") 
  ;
--------------------------------------------------------
--  DDL for Index EMPLOYESS_PHOTOS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SODIUM_DEMO"."EMPLOYESS_PHOTOS_PK" ON "SODIUM_DEMO"."EMPLOYEE_PHOTO" ("EMP_ID") 
  ;
--------------------------------------------------------
--  DDL for Index EMPPK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SODIUM_DEMO"."EMPPK" ON "SODIUM_DEMO"."EMPLOYEES" ("EMP_ID") 
  ;
--------------------------------------------------------
--  DDL for Index ILLER_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SODIUM_DEMO"."ILLER_PK" ON "SODIUM_DEMO"."PROVINCES" ("PROVINCE_ID") 
  ;
--------------------------------------------------------
--  DDL for Index REG_ID_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SODIUM_DEMO"."REG_ID_PK" ON "SODIUM_DEMO"."REGIONS" ("REGION_ID") 
  ;
--------------------------------------------------------
--  DDL for Index ROLES_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SODIUM_DEMO"."ROLES_PK" ON "SODIUM_DEMO"."ROLES" ("ROLE_NAME") 
  ;
--------------------------------------------------------
--  DDL for Index USER_ROLES_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SODIUM_DEMO"."USER_ROLES_PK" ON "SODIUM_DEMO"."USER_ROLES" ("USER_NAME", "ROLE_NAME") 
  ;
--------------------------------------------------------
--  DDL for Index USERS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SODIUM_DEMO"."USERS_PK" ON "SODIUM_DEMO"."USERS" ("USER_NAME") 
  ;
--------------------------------------------------------
--  Constraints for Table CARS
--------------------------------------------------------

  ALTER TABLE "SODIUM_DEMO"."CARS" MODIFY ("EMP_ID" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."CARS" MODIFY ("CAR_ID" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."CARS" ADD CONSTRAINT "CARS_ID" PRIMARY KEY ("CAR_ID") ENABLE;
--------------------------------------------------------
--  Constraints for Table COLORS
--------------------------------------------------------

  ALTER TABLE "SODIUM_DEMO"."COLORS" MODIFY ("COLOR_ID" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."COLORS" MODIFY ("COLOR_NAME" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."COLORS" ADD CONSTRAINT "COLORS_PK" PRIMARY KEY ("COLOR_ID") ENABLE;
--------------------------------------------------------
--  Constraints for Table COUNTIES
--------------------------------------------------------

  ALTER TABLE "SODIUM_DEMO"."COUNTIES" ADD CONSTRAINT "COUNTIES_PK" PRIMARY KEY ("COUNTY_ID") ENABLE;
  ALTER TABLE "SODIUM_DEMO"."COUNTIES" MODIFY ("PROVINCE_ID" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."COUNTIES" MODIFY ("COUNTY_NAME" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."COUNTIES" MODIFY ("COUNTY_ID" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table COUNTRIES
--------------------------------------------------------

  ALTER TABLE "SODIUM_DEMO"."COUNTRIES" ADD CONSTRAINT "COUNTRIES_PK" PRIMARY KEY ("COUNTRY_ID") ENABLE;
  ALTER TABLE "SODIUM_DEMO"."COUNTRIES" MODIFY ("COUNTRY_ID" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."COUNTRIES" ADD CONSTRAINT "COUNTRIES_CHK1" CHECK (REGION_ID is not null) ENABLE;
--------------------------------------------------------
--  Constraints for Table DEPS
--------------------------------------------------------

  ALTER TABLE "SODIUM_DEMO"."DEPS" MODIFY ("DEP_NAME" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."DEPS" MODIFY ("DEP_ID" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."DEPS" ADD CONSTRAINT "DEPS_PK" PRIMARY KEY ("DEP_ID") ENABLE;
--------------------------------------------------------
--  Constraints for Table EMP_DETAILS
--------------------------------------------------------

  ALTER TABLE "SODIUM_DEMO"."EMP_DETAILS" MODIFY ("BIRTH_DATE" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."EMP_DETAILS" MODIFY ("EMP_ID" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table EMPLOYEE_PHOTO
--------------------------------------------------------

  ALTER TABLE "SODIUM_DEMO"."EMPLOYEE_PHOTO" MODIFY ("EMP_ID" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."EMPLOYEE_PHOTO" ADD CONSTRAINT "EMPLOYESS_PHOTOS_PK" PRIMARY KEY ("EMP_ID") ENABLE;
--------------------------------------------------------
--  Constraints for Table EMPLOYEES
--------------------------------------------------------

  ALTER TABLE "SODIUM_DEMO"."EMPLOYEES" MODIFY ("DEP_ID" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."EMPLOYEES" MODIFY ("EMP_ID" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."EMPLOYEES" ADD CONSTRAINT "EMPPK" PRIMARY KEY ("EMP_ID") ENABLE;
--------------------------------------------------------
--  Constraints for Table PROVINCES
--------------------------------------------------------

  ALTER TABLE "SODIUM_DEMO"."PROVINCES" MODIFY ("PROVINCE_NAME" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."PROVINCES" ADD CONSTRAINT "PROVINCES_PK" PRIMARY KEY ("PROVINCE_ID") ENABLE;
  ALTER TABLE "SODIUM_DEMO"."PROVINCES" MODIFY ("PROVINCE_ID" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."PROVINCES" ADD CONSTRAINT "PROVINCES_CHK1" CHECK (country_id is not null) ENABLE;
--------------------------------------------------------
--  Constraints for Table REGIONS
--------------------------------------------------------

  ALTER TABLE "SODIUM_DEMO"."REGIONS" MODIFY ("REGION_ID" CONSTRAINT "REGION_ID_NN" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."REGIONS" ADD CONSTRAINT "REG_ID_PK" PRIMARY KEY ("REGION_ID") ENABLE;
--------------------------------------------------------
--  Constraints for Table ROLES
--------------------------------------------------------

  ALTER TABLE "SODIUM_DEMO"."ROLES" MODIFY ("ROLE_NAME" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."ROLES" ADD CONSTRAINT "ROLES_PK" PRIMARY KEY ("ROLE_NAME") ENABLE;
--------------------------------------------------------
--  Constraints for Table USER_ROLES
--------------------------------------------------------

  ALTER TABLE "SODIUM_DEMO"."USER_ROLES" ADD CONSTRAINT "USER_ROLES_PK" PRIMARY KEY ("USER_NAME", "ROLE_NAME") ENABLE;
  ALTER TABLE "SODIUM_DEMO"."USER_ROLES" MODIFY ("ROLE_NAME" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."USER_ROLES" MODIFY ("USER_NAME" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table USERS
--------------------------------------------------------

  ALTER TABLE "SODIUM_DEMO"."USERS" ADD CONSTRAINT "USERS_PK" PRIMARY KEY ("USER_NAME") ENABLE;
  ALTER TABLE "SODIUM_DEMO"."USERS" MODIFY ("PASSWORD" NOT NULL ENABLE);
  ALTER TABLE "SODIUM_DEMO"."USERS" MODIFY ("USER_NAME" NOT NULL ENABLE);

--------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------
--------  DATA
--------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------
Insert into SODIUM_DEMO.ROLES (ROLE_NAME) values ('ADMIN');
Insert into SODIUM_DEMO.USER_ROLES (USER_NAME,ROLE_NAME) values ('admin','ADMIN');
Insert into SODIUM_DEMO.USERS (USER_NAME,PASSWORD) values ('admin','1234');


commit;
