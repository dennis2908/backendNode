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
DROP TABLE IF EXISTS "role";
CREATE TABLE "role" (
  "id" SERIAL,
  "role_name" varchar(100) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "role_assign" varchar(20000) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying
)
;
ALTER SEQUENCE role_id_seq RESTART WITH 2;
-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO "role" VALUES (1, 'admin', '{"mrole":true,"muser":true,"memployee":true,"mbranch":true,"mcompany":true,"massignment":true}');