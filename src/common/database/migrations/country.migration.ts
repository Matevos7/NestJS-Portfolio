import { MigrationInterface, QueryRunner } from 'typeorm';

export class coutries1716408986202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      INSERT INTO countries(id,name,alpha2,alpha3,continent,phone_code,currency) VALUES 
       ('1','Andorra','ad','and','Europe','376','Euro'), 
       ('2','United Arab Emirates','ae','are','Asia','971','Dirham'), 
       ('3','Afghanistan','af','afg','Asia','93','Afghani'), 
       ('4','Antigua and Barbuda','ag','atg','North America','1-268','Dollar'), 
       ('5','Anguilla','ai','aia','North America','1-264','Dollar'), 
       ('6','Albania','al','alb','Europe','355','Lek'), 
       ('7','Armenia','am','arm','Asia','374','Dram'), 
       ('8','Angola','ao','ago','Africa','244','Kwanza'), 
       ('9','Antarctica','aq','ata','Antarctica','672',''), 
       ('10','Argentina','ar','arg','South America','54','Peso'), 
       ('11','American Samoa','as','asm','Oceania','1-684','Dollar'), 
       ('12','Austria','at','aut','Europe','43','Euro'), 
       ('13','Australia','au','aus','Oceania','61','Dollar'), 
       ('14','Aruba','aw','abw','North America','297','Guilder'), 
       ('15','Azerbaijan','az','aze','Asia','994','Manat'), 
       ('16','Bosnia and Herzegovina','ba','bih','Europe','387','Marka'), 
       ('17','Barbados','bb','brb','North America','1-246','Dollar'), 
       ('18','Bangladesh','bd','bgd','Asia','880','Taka'), 
       ('19','Belgium','be','bel','Europe','32','Euro'), 
       ('20','Burkina Faso','bf','bfa','Africa','226','Franc'), 
       ('21','Bulgaria','bg','bgr','Europe','359','Lev'), 
       ('22','Bahrain','bh','bhr','Asia','973','Dinar'), 
       ('23','Burundi','bi','bdi','Africa','257','Franc'), 
       ('24','Benin','bj','ben','Africa','229','Franc'), 
       ('25','Saint Barthelemy','bl','blm','North America','590','Euro'),
       ('26','Bermuda','bm','bmu','North America','1-441','Dollar'), 
       ('27','Brunei','bn','brn','Asia','673','Dollar'), 
       ('28','Bolivia','bo','bol','South America','591','Boliviano'), 
       ('29','Brazil','br','bra','South America','55','Real'), 
       ('30','Bahamas','bs','bhs','North America','1-242','Dollar'), 
       ('31','Bhutan','bt','btn','Asia','975','Ngultrum'), 
       ('32','Botswana','bw','bwa','Africa','267','Pula'), 
       ('33','Belarus','by','blr','Europe','375','Ruble'), 
       ('34','Belize','bz','blz','North America','501','Dollar'), 
       ('35','Canada','ca','can','North America','1','Dollar'), 
       ('36','Cocos Islands','cc','cck','Asia','61','Dollar'), 
       ('37','Democratic Republic of the Congo','cd','cod','Africa','243','Franc'), 
       ('38','Central African Republic','cf','caf','Africa','236','Franc'), 
       ('39','Republic of the Congo','cg','cog','Africa','242','Franc'), 
       ('40','Switzerland','ch','che','Europe','41','Franc'), 
       ('41','Cook Islands','ck','cok','Oceania','682','Dollar'), 
       ('42','Chile','cl','chl','South America','56','Peso'), 
       ('43','Cameroon','cm','cmr','Africa','237','Franc'), 
       ('44','China','cn','chn','Asia','86','Yuan Renminbi'), 
       ('45','Colombia','co','col','South America','57','Peso'), 
       ('46','Costa Rica','cr','cri','North America','506','Colon'), 
       ('47','Cuba','cu','cub','North America','53','Peso'), 
       ('48','Cape Verde','cv','cpv','Africa','238','Escudo'), 
       ('49','Curacao','cw','cuw','North America','599','Guilder'), 
       ('50','Christmas Island','cx','cxr','Asia','61','Dollar'), 
       ('51','Cyprus','cy','cyp','Europe','357','Euro'),
       ('52','Czech Republic','cz','cze','Europe','420','Koruna'), 
       ('53','Germany','de','deu','Europe','49','Euro'), 
       ('54','Djibouti','dj','dji','Africa','253','Franc'), 
       ('55','Denmark','dk','dnk','Europe','45','Krone'), 
       ('56','Dominica','dm','dma','North America','1-767','Dollar'), 
       ('57','Dominican Republic','do','dom','North America','1-809, 1-829, 1-849','Peso'), 
       ('58','Algeria','dz','dza','Africa','213','Dinar'), 
       ('59','Ecuador','ec','ecu','South America','593','Dollar'), 
       ('60','Estonia','ee','est','Europe','372','Euro'), 
       ('61','Egypt','eg','egy','Africa','20','Pound'), 
       ('62','Western Sahara','eh','esh','Africa','212','Dirham'), 
       ('63','Eritrea','er','eri','Africa','291','Nakfa'), 
       ('64','Spain','es','esp','Europe','34','Euro'), 
       ('65','Ethiopia','et','eth','Africa','251','Birr'), 
       ('66','Finland','fi','fin','Europe','358','Euro'), 
       ('67','Fiji','fj','fji','Oceania','679','Dollar'), 
       ('68','Falkland Islands','fk','flk','South America','500','Pound'), 
       ('69','Faroe Islands','fo','fro','Europe','298','Krone'), 
       ('70','France','fr','fra','Europe','33','Euro'), 
       ('71','Gabon','ga','gab','Africa','241','Franc'), 
       ('72','United Kingdom','gb','gbr','Europe','44','Pound'), 
       ('73','Grenada','gd','grd','North America','1-473','Dollar'), 
       ('74','Georgia','ge','geo','Asia','995','Lari'), 
       ('75','Guernsey','gg','ggy','Europe','44-1481','Pound'), 
       ('76','Ghana','gh','gha','Africa','233','Cedi'), 
       ('77','Gibraltar','gi','gib','Europe','350','Pound'), 
       ('78','Greenland','gl','grl','North America','299','Krone'),
       ('79','Gambia','gm','gmb','Africa','220','Dalasi'), 
       ('80','Guinea','gn','gin','Africa','224','Franc'), 
       ('81','Equatorial Guinea','gq','gnq','Africa','240','Franc'), 
       ('82','Greece','gr','grc','Europe','30','Euro'), 
       ('83','Guatemala','gt','gtm','North America','502','Quetzal'), 
       ('84','Guam','gu','gum','Oceania','1-671','Dollar'), 
       ('85','Guinea-Bissau','gw','gnb','Africa','245','Franc'), 
       ('86','Guyana','gy','guy','South America','592','Dollar'), 
       ('87','Hong Kong','hk','hkg','Asia','852','Dollar'), 
       ('88','Honduras','hn','hnd','North America','504','Lempira'), 
       ('89','Croatia','hr','hrv','Europe','385','Kuna'), 
       ('90','Haiti','ht','hti','North America','509','Gourde'), 
       ('91','Hungary','hu','hun','Europe','36','Forint'), 
       ('92','Indonesia','id','idn','Asia','62','Rupiah'), 
       ('93','Ireland','ie','irl','Europe','353','Euro'), 
       ('94','Israel','il','isr','Asia','972','Shekel'), 
       ('95','Isle of Man','im','imn','Europe','44-1624','Pound'), 
       ('96','India','in','ind','Asia','91','Rupee'), 
       ('97','British Indian Ocean Territory','io','iot','Asia','246','Dollar'), 
       ('98','Iraq','iq','irq','Asia','964','Dinar'), 
       ('99','Iran','ir','irn','Asia','98','Rial'), 
       ('100','Iceland','is','isl','Europe','354','Krona'), 
       ('101','Italy','it','ita','Europe','39','Euro'), 
       ('102','Jersey','je','jey','Europe','44-1534','Pound'), 
       ('103','Jamaica','jm','jam','North America','1-876','Dollar'), 
       ('104','Jordan','jo','jor','Asia','962','Dinar'), 
       ('105','Japan','jp','jpn','Asia','81','Yen'),
       ('106','Kenya','ke','ken','Africa','254','Shilling'), 
       ('107','Kyrgyzstan','kg','kgz','Asia','996','Som'), 
       ('108','Cambodia','kh','khm','Asia','855','Riels'), 
       ('109','Kiribati','ki','kir','Oceania','686','Dollar'), 
       ('110','Comoros','km','com','Africa','269','Franc'), 
       ('111','Saint Kitts and Nevis','kn','kna','North America','1-869','Dollar'), 
       ('112','North Korea','kp','prk','Asia','850','Won'), 
       ('113','South Korea','kr','kor','Asia','82','Won'), 
       ('114','Kuwait','kw','kwt','Asia','965','Dinar'), 
       ('115','Cayman Islands','ky','cym','North America','1-345','Dollar'), 
       ('116','Kazakhstan','kz','kaz','Asia','7','Tenge'), 
       ('117','Laos','la','lao','Asia','856','Kip'), 
       ('118','Lebanon','lb','lbn','Asia','961','Pound'), 
       ('119','Saint Lucia','lc','lca','North America','1-758','Dollar'), 
       ('120','Liechtenstein','li','lie','Europe','423','Franc'), 
       ('121','Sri Lanka','lk','lka','Asia','94','Rupee'), 
       ('122','Liberia','lr','lbr','Africa','231','Dollar'), 
       ('123','Lesotho','ls','lso','Africa','266','Loti'), 
       ('124','Lithuania','lt','ltu','Europe','370','Euro'), 
       ('125','Luxembourg','lu','lux','Europe','352','Euro'), 
       ('126','Latvia','lv','lva','Europe','371','Euro'), 
       ('127','Libya','ly','lby','Africa','218','Dinar'), 
       ('128','Morocco','ma','mar','Africa','212','Dirham'), 
       ('129','Monaco','mc','mco','Europe','377','Euro'), 
       ('130','Moldova','md','mda','Europe','373','Leu'), 
       ('131','Montenegro','me','mne','Europe','382','Euro'), 
       ('132','Saint Martin','mf','maf','North America','590','Euro'),
       ('133','Madagascar','mg','mdg','Africa','261','Ariary'), 
       ('134','Marshall Islands','mh','mhl','Oceania','692','Dollar'), 
       ('135','Macedonia','mk','mkd','Europe','389','Denar'), 
       ('136','Mali','ml','mli','Africa','223','Franc'), 
       ('137','Myanmar','mm','mmr','Asia','95','Kyat'), 
       ('138','Mongolia','mn','mng','Asia','976','Tugrik'), 
       ('139','Macau','mo','mac','Asia','853','Pataca'), 
       ('140','Northern Mariana Islands','mp','mnp','Oceania','1-670','Dollar'), 
       ('141','Mauritania','mr','mrt','Africa','222','Ouguiya'), 
       ('142','Montserrat','ms','msr','North America','1-664','Dollar'), 
       ('143','Malta','mt','mlt','Europe','356','Euro'), 
       ('144','Mauritius','mu','mus','Africa','230','Rupee'), 
       ('145','Maldives','mv','mdv','Asia','960','Rufiyaa'), 
       ('146','Malawi','mw','mwi','Africa','265','Kwacha'), 
       ('147','Mexico','mx','mex','North America','52','Peso'), 
       ('148','Malaysia','my','mys','Asia','60','Ringgit'), 
       ('149','Mozambique','mz','moz','Africa','258','Metical'), 
       ('150','Namibia','na','nam','Africa','264','Dollar'), 
       ('151','New Caledonia','nc','ncl','Oceania','687','Franc'), 
       ('152','Niger','ne','ner','Africa','227','Franc'), 
       ('153','Nigeria','ng','nga','Africa','234','Naira'), 
       ('154','Nicaragua','ni','nic','North America','505','Corbirthdaya'), 
       ('155','Netherlands','nl','nld','Europe','31','Euro'), 
       ('156','Norway','no','nor','Europe','47','Krone'), 
       ('157','Nepal','np','npl','Asia','977','Rupee'), 
       ('158','Nauru','nr','nru','Oceania','674','Dollar'), 
       ('159','Niue','nu','niu','Oceania','683','Dollar'),
       ('160','New Zealand','nz','nzl','Oceania','64','Dollar'), 
       ('161','Oman','om','omn','Asia','968','Rial'), 
       ('162','Panama','pa','pan','North America','507','Balboa'), 
       ('163','Peru','pe','per','South America','51','Sol'), 
       ('164','French Polynesia','pf','pyf','Oceania','689','Franc'), 
       ('165','Papua New Guinea','pg','png','Oceania','675','Kina'), 
       ('166','Philippines','ph','phl','Asia','63','Peso'), 
       ('167','Pakistan','pk','pak','Asia','92','Rupee'), 
       ('168','Poland','pl','pol','Europe','48','Zloty'), 
       ('169','Saint Pierre and Miquelon','pm','spm','North America','508','Euro'), 
       ('170','Pitcairn','pn','pcn','Oceania','64','Dollar'), 
       ('171','Puerto Rico','pr','pri','North America','1-787, 1-939','Dollar'), 
       ('172','Palestine','ps','pse','Asia','970','Shekel'), 
       ('173','Portugal','pt','prt','Europe','351','Euro'), 
       ('174','Palau','pw','plw','Oceania','680','Dollar'), 
       ('175','Paraguay','py','pry','South America','595','Guarani'), 
       ('176','Qatar','qa','qat','Asia','974','Rial'), 
       ('177','Romania','ro','rou','Europe','40','Leu'), 
       ('178','Serbia','rs','srb','Europe','381','Dinar'), 
       ('179','Russia','ru','rus','Europe','7','Ruble'), 
       ('180','Rwanda','rw','rwa','Africa','250','Franc'), 
       ('181','Saudi Arabia','sa','sau','Asia','966','Rial'), 
       ('182','Solomon Islands','sb','slb','Oceania','677','Dollar'), 
       ('183','Seychelles','sc','syc','Africa','248','Rupee'), 
       ('184','Sudan','sd','sdn','Africa','249','Pound'), 
       ('185','Sweden','se','swe','Europe','46','Krona'), 
       ('186','Singapore','sg','sgp','Asia','65','Dollar'),
       ('187','Saint Helena','sh','shn','Africa','290','Pound'), 
       ('188','Slovenia','si','svn','Europe','386','Euro'), 
       ('189','Svalbard and Jan Mayen','sj','sjm','Europe','47','Krone'), 
       ('190','Slovakia','sk','svk','Europe','421','Euro'), 
       ('191','Sierra Leone','sl','sle','Africa','232','Leone'), 
       ('192','San Marino','sm','smr','Europe','378','Euro'), 
       ('193','Senegal','sn','sen','Africa','221','Franc'), 
       ('194','Somalia','so','som','Africa','252','Shilling'), 
       ('195','Suriname','sr','sur','South America','597','Dollar'), 
       ('196','South Sudan','ss','ssd','Africa','211','Pound'), 
       ('197','Sao Tome and Principe','st','stp','Africa','239','Dobra'), 
       ('198','El Salvador','sv','slv','North America','503','Dollar'), 
       ('199','Sint Maarten','sx','sxm','North America','1-721','Guilder'), 
       ('200','Syria','sy','syr','Asia','963','Pound'), 
       ('201','Swaziland','sz','swz','Africa','268','Lilangeni'), 
       ('202','Turks and Caicos Islands','tc','tca','North America','1-649','Dollar'), 
       ('203','Chad','td','tcd','Africa','235','Franc'), 
       ('204','Togo','tg','tgo','Africa','228','Franc'), 
       ('205','Thailand','th','tha','Asia','66','Baht'), 
       ('206','Tajikistan','tj','tjk','Asia','992','Somoni'), 
       ('207','Tokelau','tk','tkl','Oceania','690','Dollar'), 
       ('208','East Timor','tl','tls','Oceania','670','Dollar'), 
       ('209','Turkmenistan','tm','tkm','Asia','993','Manat'), 
       ('210','Tunisia','tn','tun','Africa','216','Dinar'), 
       ('211','Tonga','to','ton','Oceania','676','Pa''anga'), 
       ('212','Turkey','tr','tur','Asia','90','Lira'),
       ('213','Trinidad and Tobago','tt','tto','North America','1-868','Dollar'), 
       ('214','Tuvalu','tv','tuv','Oceania','688','Dollar'), 
       ('215','Taiwan','tw','twn','Asia','886','Dollar'), 
       ('216','Tanzania','tz','tza','Africa','255','Shilling'), 
       ('217','Ukraine','ua','ukr','Europe','380','Hryvnia'), 
       ('218','Uganda','ug','uga','Africa','256','Shilling'), 
       ('219','United States','us','usa','North America','1','Dollar'), 
       ('220','Uruguay','uy','ury','South America','598','Peso'), 
       ('221','Uzbekistan','uz','uzb','Asia','998','Som'), 
       ('222','Vatican','va','vat','Europe','379','Euro'), 
       ('223','Saint Vincent and the Grenadines','vc','vct','North America','1-784','Dollar'), 
       ('224','Venezuela','ve','ven','South America','58','Bolivar'), 
       ('225','British Virgin Islands','vg','vgb','North America','1-284','Dollar'), 
       ('226','U.S. Virgin Islands','vi','vir','North America','1-340','Dollar'), 
       ('227','Vietnam','vn','vnm','Asia','84','Dong'), 
       ('228','Vanuatu','vu','vut','Oceania','678','Vatu'), 
       ('229','Wallis and Futuna','wf','wlf','Oceania','681','Franc'), 
       ('230','Samoa','ws','wsm','Oceania','685','Tala'), 
       ('231','Yemen','ye','yem','Asia','967','Rial'), 
       ('232','Mayotte','yt','myt','Africa','262','Euro'), 
       ('233','South Africa','za','zaf','Africa','27','Rand'), 
       ('234','Zambia','zm','zmb','Africa','260','Kwacha'), 
       ('235','Zimbabwe','zw','zwe','Africa','263','Dollar');
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM countries;`);
  }
}
