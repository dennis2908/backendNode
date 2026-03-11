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

 Date: 12/07/2023 09:46:23
*/


-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
  "id" SERIAL,
  "username" varchar(300) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "name" varchar(120) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "password" varchar(300) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "email" varchar(210) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "birthdate" date,
  "m_role" int2
)
;

ALTER SEQUENCE users_id_seq RESTART WITH 2;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "users" VALUES (1, 'dennis', 'dennis', '$2b$10$IxjIL5H0XscxR9Z7GNQZruMc776WKuyH6AXGhi6oYK1SxMPO1Dy2C', 'manullang_d@yahoo.com', '2023-06-08', 1);
