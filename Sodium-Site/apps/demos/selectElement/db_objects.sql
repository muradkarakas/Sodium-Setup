--------------------------------------------------------
--  File created - Pazartesi-Ocak-01-2018   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table PROVINCES
--------------------------------------------------------

  CREATE TABLE "PROVINCES" 
   (	"PROVINCE_ID" NUMBER, 
	"PROVINCE_NAME" VARCHAR2(20), 
	"COUNTRY_ID" VARCHAR2(2) DEFAULT NULL
   ) ;
--------------------------------------------------------
--  DDL for Table COUNTIES
--------------------------------------------------------

  CREATE TABLE "COUNTIES" 
   (	"COUNTY_ID" VARCHAR2(20), 
	"COUNTY_NAME" VARCHAR2(20), 
	"PROVINCE_ID" VARCHAR2(20)
   ) ;
REM INSERTING into PROVINCES
SET DEFINE OFF;
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('1','Adana','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('2','Adıyaman','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('3','Afyon','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('4','Ağrı','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('5','Amasya','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('6','Ankara','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('7','Antalya','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('8','Artvin','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('9','Aydın','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('10','Balıkesir','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('11','Bilecik','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('12','Bingöl','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('13','Bitlis','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('14','Bolu','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('15','Burdur','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('16','Bursa','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('17','Çanakkale','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('18','Çankırı','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('19','Çorum','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('20','Denizli','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('21','Diyarbakır','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('22','Edirne','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('23','Elazığ','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('24','Erzincan','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('25','Erzurum','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('26','Eskişehir','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('27','Gaziantep','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('28','Giresun','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('29','Gümüşhane','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('30','Hakkari','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('31','Hatay','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('32','Isparta','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('33','İçel','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('34','İstanbul','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('35','İzmir','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('36','Kars','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('37','Kastamonu','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('38','Kayseri','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('39','Kırklareli','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('40','Kırşehir','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('41','Kocaeli','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('42','Konya','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('43','Kütahya','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('44','Malatya','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('45','Manisa','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('46','K.maraş','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('47','Mardin','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('48','Muğla','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('49','Muş','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('50','Nevşehir','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('51','Niğde','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('52','Ordu','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('53','Rize','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('54','Sakarya','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('55','Samsun','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('56','Siirt','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('57','Sinop','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('58','Sivas','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('59','Tekirdağ','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('60','Tokat','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('61','Trabzon','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('62','Tunceli','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('63','Şanlıurfa','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('64','Uşak','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('65','Van','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('66','Yozgat','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('67','Zonguldak','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('68','Aksaray','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('69','Bayburt','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('70','Karaman','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('71','Kırıkkale','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('72','Batman','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('73','Şırnak','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('74','Bartın','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('75','Ardahan','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('76','Iğdır','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('77','Yalova','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('78','Karabük','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('79','Kilis','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('80','Osmaniye','TR');
Insert into PROVINCES (PROVINCE_ID,PROVINCE_NAME,COUNTRY_ID) values ('81','Düzce','TR');
REM INSERTING into COUNTIES
SET DEFINE OFF;
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21282','Adana 01','1');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21285','Adana 02','1');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21286','Adana 03','1');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21288','Adana 04','1');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21303','Adıyaman 01','2');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21304','Adıyaman 02','2');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21305','Adıyaman 03','2');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21306','Adıyaman 04','2');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21307','Afyon 01','3');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21308','Afyon 02','3');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21309','Afyon 03','3');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21310','Ağrı 01','4');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21311','Aksaray 01','68');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21312','Aksaray 02','68');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21313','Amasya 01','5');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21314','Amasya 02','5');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21315','Amasya 03','5');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21316','Sinop 01','57');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21317','Sinop 02','57');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21318','Sinop 03','57');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21325','Bitlis 01','13');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21326','Bitlis 02','13');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21327','Bitlis 03','13');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21374','Ankara 01','6');
Insert into COUNTIES (COUNTY_ID,COUNTY_NAME,PROVINCE_ID) values ('21375','Ankara 02','6');
--------------------------------------------------------
--  DDL for Index ILLER_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "ILLER_PK" ON "PROVINCES" ("PROVINCE_ID") 
  ;
--------------------------------------------------------
--  Constraints for Table PROVINCES
--------------------------------------------------------

  ALTER TABLE "PROVINCES" MODIFY ("COUNTRY_ID" NOT NULL ENABLE);
  ALTER TABLE "PROVINCES" MODIFY ("PROVINCE_NAME" NOT NULL ENABLE);
  ALTER TABLE "PROVINCES" ADD CONSTRAINT "ILLER_PK" PRIMARY KEY ("PROVINCE_ID") ENABLE;
--------------------------------------------------------
--  Constraints for Table COUNTIES
--------------------------------------------------------

  ALTER TABLE "COUNTIES" MODIFY ("PROVINCE_ID" NOT NULL ENABLE);
  ALTER TABLE "COUNTIES" MODIFY ("COUNTY_NAME" NOT NULL ENABLE);
  ALTER TABLE "COUNTIES" MODIFY ("COUNTY_ID" NOT NULL ENABLE);
