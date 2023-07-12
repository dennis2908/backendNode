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
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "username" varchar(30) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "name" varchar(12) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "password" varchar(30) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "email" varchar(21) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "birthdate" date,
  "m_role" int2
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (1, 'dennis', 'dennis', 'dennisdennis', 'manullang_d@yahoo.com', '2023-06-08', 1);

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
