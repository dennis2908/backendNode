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
DROP TABLE IF EXISTS "branch";
CREATE TABLE "branch" (
  "id" SERIAL,
  "branch_name" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of branch
-- ----------------------------
INSERT INTO "branch" VALUES (1, 'jakarta pusat');
INSERT INTO "branch" VALUES (2, 'bekasi');
INSERT INTO "branch" VALUES (3, 'surabaya');
INSERT INTO "branch" VALUES (4, 'yogyakarta');
