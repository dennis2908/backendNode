/*
 Navicat Premium Data Transfer

 Source Server         : Postgre
 Source Server Type    : PostgreSQL
 Source Server Version : 120004
 Source Host           : localhost:5432
 Source Catalog        : penjualan
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120004
 File Encoding         : 65001

 Date: 29/10/2020 17:08:54
*/


-- ----------------------------
-- Table structure for mahasiswa
-- ----------------------------
DROP TABLE IF EXISTS "public"."mahasiswa";
CREATE TABLE "public"."mahasiswa" (
  "id" int4 NOT NULL,
  "nama" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "nim" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "jenis_kelamin" varchar(1) COLLATE "pg_catalog"."default" NOT NULL,
  "fakultas" varchar(50) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of mahasiswa
-- ----------------------------
INSERT INTO "public"."mahasiswa" VALUES (1, 'Johny Pambudi', '1234567890', 'L', 'Teknik');
INSERT INTO "public"."mahasiswa" VALUES (2, 'Maya Rahmaniah', '1234456667', 'P', 'Ekonomi');
INSERT INTO "public"."mahasiswa" VALUES (3, 'Diki ALfarabi Hadi', '123345678887', 'L', 'Teknik');
INSERT INTO "public"."mahasiswa" VALUES (4, 'Suamtono', '123456789', 'L', 'Fisip');
INSERT INTO "public"."mahasiswa" VALUES (5, 'Jamludin Syah', '12345663536', 'L', 'Teknik');
INSERT INTO "public"."mahasiswa" VALUES (6, 'Rahmaniah', '212111231133', 'P', 'Ekonomi');
INSERT INTO "public"."mahasiswa" VALUES (7, 'Qiano Arfabian Putra', '1123555365', 'L', 'Teknik');
INSERT INTO "public"."mahasiswa" VALUES (8, 'Gibran', '1122432434', 'L', 'Ekonomi');
INSERT INTO "public"."mahasiswa" VALUES (9, 'Johny', '12363377332', 'L', 'Pertanian');
INSERT INTO "public"."mahasiswa" VALUES (10, 'Muhammad Riski', '12837373839', 'L', 'Fisip');
INSERT INTO "public"."mahasiswa" VALUES (11, 'Rahmat Syah Alub', '122652626252', 'L', 'Fisip');
INSERT INTO "public"."mahasiswa" VALUES (12, 'Mahmud Amir', '123455467464', 'L', 'Pertanian');
INSERT INTO "public"."mahasiswa" VALUES (13, 'Aminah', '123112342', 'P', 'Teknik');
INSERT INTO "public"."mahasiswa" VALUES (14, 'Putri Aladin', '213114324234', 'P', 'Ekonomi');
INSERT INTO "public"."mahasiswa" VALUES (15, 'Lubis', '11231334234', 'P', 'Pertanian');
INSERT INTO "public"."mahasiswa" VALUES (16, 'Iqlima', '12312423423', 'P', 'Pertanian');
INSERT INTO "public"."mahasiswa" VALUES (17, 'Rahman Muhammad', '121312438', 'L', 'Pertanian');
INSERT INTO "public"."mahasiswa" VALUES (18, 'Muhammad Ikbal', '12387448844', 'L', 'Teknik');
INSERT INTO "public"."mahasiswa" VALUES (19, 'Monika', '1223244344', 'P', 'Fisip');
INSERT INTO "public"."mahasiswa" VALUES (20, 'Haris Aziz', '1123834748', 'L', 'Teknik');

-- ----------------------------
-- Table structure for penjualan
-- ----------------------------
DROP TABLE IF EXISTS "public"."penjualan";
CREATE TABLE "public"."penjualan" (
  "id" int4 NOT NULL,
  "bulan" varchar(11) COLLATE "pg_catalog"."default" NOT NULL,
  "tahun" int4 NOT NULL,
  "hasil_penjualan" int4 NOT NULL
)
;

-- ----------------------------
-- Records of penjualan
-- ----------------------------
INSERT INTO "public"."penjualan" VALUES (1, 'January', 2016, 10000000);
INSERT INTO "public"."penjualan" VALUES (2, 'February', 2016, 12000000);
INSERT INTO "public"."penjualan" VALUES (3, 'Maret', 2016, 13000000);
INSERT INTO "public"."penjualan" VALUES (4, 'April', 2016, 18000000);
INSERT INTO "public"."penjualan" VALUES (5, 'May', 2017, 16000000);
INSERT INTO "public"."penjualan" VALUES (6, 'Juni', 2016, 14000000);
INSERT INTO "public"."penjualan" VALUES (7, 'July', 2016, 15000000);
INSERT INTO "public"."penjualan" VALUES (8, 'Agustus', 2016, 12000000);
INSERT INTO "public"."penjualan" VALUES (9, 'September', 2016, 19000000);
INSERT INTO "public"."penjualan" VALUES (10, 'Oktober', 2016, 12000000);
INSERT INTO "public"."penjualan" VALUES (11, 'November', 2016, 12000000);
INSERT INTO "public"."penjualan" VALUES (12, 'Desember', 2016, 20000000);

-- ----------------------------
-- Table structure for tbl_marks
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_marks";
CREATE TABLE "public"."tbl_marks" (
  "student_id" int4 NOT NULL,
  "student_name" varchar(35) COLLATE "pg_catalog"."default" NOT NULL,
  "marks" int4 DEFAULT 0
)
;

-- ----------------------------
-- Records of tbl_marks
-- ----------------------------
INSERT INTO "public"."tbl_marks" VALUES (1, 'John', 39);
INSERT INTO "public"."tbl_marks" VALUES (2, 'Mary ', 46);
INSERT INTO "public"."tbl_marks" VALUES (3, 'Maya', 65);
INSERT INTO "public"."tbl_marks" VALUES (4, 'Rahul', 90);
INSERT INTO "public"."tbl_marks" VALUES (5, 'Priya', 75);

-- ----------------------------
-- Checks structure for table tbl_marks
-- ----------------------------
ALTER TABLE "public"."tbl_marks" ADD CONSTRAINT "tbl_marks_student_id_check" CHECK (student_id > 0);
