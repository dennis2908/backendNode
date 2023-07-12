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

 Date: 12/07/2023 09:46:10
*/


-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS "public"."role";
CREATE TABLE "public"."role" (
  "id" int4 NOT NULL DEFAULT nextval('role_id_seq'::regclass),
  "role_name" varchar(50) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "role_assign" varchar(200) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying
)
;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO "public"."role" VALUES (1, 'admin', '{"mrole":true,"muser":true,"memployee":true,"mbranch":true,"mcompany":true,"massignment":true}');

-- ----------------------------
-- Primary Key structure for table role
-- ----------------------------
ALTER TABLE "public"."role" ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");
