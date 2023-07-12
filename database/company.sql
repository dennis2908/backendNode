/*
 Navicat Premium Data Transfer

 Source Server         : PostgreSQL Local
 Source Server Type    : PostgreSQL
 Source Server Version : 100004
 Source Host           : localhost:5432
 Source Catalog        : angular
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100004
 File Encoding         : 65001

 Date: 12/07/2023 09:45:09
*/


-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS "public"."company";
CREATE TABLE "public"."company" (
  "id" int4 NOT NULL DEFAULT nextval('company_id_seq'::regclass),
  "company_name" varchar(40) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "address" varchar(100) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "email" varchar(40) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "m_branch" int2,
  "phone" varchar(15) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying
)
;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO "public"."company" VALUES (1, 'dmdmd', 'dmdmd', 'dmdmd@yahoo.com', 1, '08127272727227');
INSERT INTO "public"."company" VALUES (2, 'adsadsaasdadsasdsad', 'jakarta pusat', 'dennis@yahoo.com', 1, '081292929292929');
INSERT INTO "public"."company" VALUES (3, 'Belimbing jaya', 'jakarta pusat jln tanah abang selatan', 'belimbing@yahoo.com', 3, '+6288829282882');

-- ----------------------------
-- Primary Key structure for table company
-- ----------------------------
ALTER TABLE "public"."company" ADD CONSTRAINT "company_pkey" PRIMARY KEY ("id");
