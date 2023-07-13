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

 Date: 12/07/2023 09:45:29
*/


-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS "employee";
CREATE TABLE "employee" (
  "id" SERIAL,
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "firstname" varchar(255) COLLATE "pg_catalog"."default",
  "lastname" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "birthdate" date,
  "basicsalary" numeric(20,2),
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "groupdata" varchar(255) COLLATE "pg_catalog"."default",
  "created_date" TIMESTAMP
)
;
ALTER SEQUENCE employee_id_seq RESTART WITH 2;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO "employee" VALUES (1, 'dennis', 'dennis', 'dennis', 'dennis@yahoo.com', '2023-06-08', 1000000.00, 'single', 'System Analyst',now());