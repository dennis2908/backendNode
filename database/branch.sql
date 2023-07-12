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

 Date: 12/07/2023 09:44:55
*/


-- ----------------------------
-- Table structure for branch
-- ----------------------------
DROP TABLE IF EXISTS "public"."branch";
CREATE TABLE "public"."branch" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "branch_name" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of branch
-- ----------------------------
INSERT INTO "public"."branch" VALUES (1, 'jakarta pusat');
INSERT INTO "public"."branch" VALUES (2, 'bekasi');
INSERT INTO "public"."branch" VALUES (3, 'surabaya');
INSERT INTO "public"."branch" VALUES (4, 'yogyakarta');

-- ----------------------------
-- Primary Key structure for table branch
-- ----------------------------
ALTER TABLE "public"."branch" ADD CONSTRAINT "branch_pkey" PRIMARY KEY ("id");
