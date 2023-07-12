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

 Date: 12/07/2023 09:44:38
*/


-- ----------------------------
-- Table structure for assignment
-- ----------------------------
DROP TABLE IF EXISTS "assignment";
CREATE TABLE "assignment" (
  "id" SERIAL,
  "pic" varchar(50) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "employee" varchar(50) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "m_company" int2,
  "assignment_name" varchar(50) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying
)
;
ALTER SEQUENCE assignment_id_seq RESTART WITH 3;

-- ----------------------------
-- Records of assignment
-- ----------------------------
INSERT INTO "assignment" VALUES (1, 'dennis', 'dennis', 1, 'dennis');
INSERT INTO "assignment" VALUES (2, 'dennis22', 'dennis22', 1, 'dennis22');

-- ----------------------------
-- Primary Key structure for table assignment
-- ----------------------------
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_pkey" PRIMARY KEY ("id");
