-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: peoplesphere_db
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `peoplesphere_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `peoplesphere_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `peoplesphere_db`;

--
-- Table structure for table `alembic_version`
--

DROP TABLE IF EXISTS `alembic_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alembic_version` (
  `version_num` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alembic_version`
--

LOCK TABLES `alembic_version` WRITE;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version` VALUES ('10c961b8a4c4');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `date` date NOT NULL,
  `shift_id` int DEFAULT NULL,
  `check_in` datetime DEFAULT NULL,
  `check_out` datetime DEFAULT NULL,
  `working_hours` decimal(5,2) NOT NULL,
  `overtime_hours` decimal(5,2) NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_late` tinyint(1) NOT NULL,
  `late_minutes` int NOT NULL,
  `is_early_exit` tinyint(1) NOT NULL,
  `early_exit_minutes` int NOT NULL,
  `check_in_ip` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `check_out_ip` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `check_in_device` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_attendance_employee_date` (`employee_id`,`date`),
  KEY `shift_id` (`shift_id`),
  KEY `ix_attendance_date` (`date`),
  KEY `ix_attendance_employee_id` (`employee_id`),
  KEY `ix_attendance_is_deleted` (`is_deleted`),
  KEY `ix_attendance_organization_id` (`organization_id`),
  KEY `ix_attendance_status` (`status`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `attendance_ibfk_3` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (121,25,'2026-11-02',3,'2026-11-02 09:00:00','2026-11-02 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(122,26,'2026-11-02',3,'2026-11-02 09:00:00','2026-11-02 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(123,27,'2026-11-02',3,'2026-11-02 09:00:00','2026-11-02 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(124,28,'2026-11-02',3,'2026-11-02 09:00:00','2026-11-02 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(125,29,'2026-11-02',3,'2026-11-02 09:00:00','2026-11-02 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(126,30,'2026-11-02',3,'2026-11-02 09:00:00','2026-11-02 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(127,31,'2026-11-02',3,'2026-11-02 09:00:00','2026-11-02 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(128,32,'2026-11-02',3,'2026-11-02 09:00:00','2026-11-02 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(129,33,'2026-11-02',3,'2026-11-02 09:00:00','2026-11-02 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(130,34,'2026-11-02',3,'2026-11-02 09:00:00','2026-11-02 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(131,35,'2026-11-02',3,'2026-11-02 09:00:00','2026-11-02 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(132,36,'2026-11-02',3,'2026-11-02 09:00:00','2026-11-02 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(133,25,'2026-11-03',3,'2026-11-03 09:00:00','2026-11-03 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(134,26,'2026-11-03',3,'2026-11-03 09:00:00','2026-11-03 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(135,27,'2026-11-03',3,'2026-11-03 09:00:00','2026-11-03 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(136,28,'2026-11-03',3,'2026-11-03 09:00:00','2026-11-03 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(137,29,'2026-11-03',3,'2026-11-03 09:00:00','2026-11-03 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(138,30,'2026-11-03',3,'2026-11-03 09:00:00','2026-11-03 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(139,31,'2026-11-03',3,'2026-11-03 09:00:00','2026-11-03 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(140,32,'2026-11-03',3,'2026-11-03 09:00:00','2026-11-03 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(141,33,'2026-11-03',3,'2026-11-03 09:00:00','2026-11-03 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(142,34,'2026-11-03',3,'2026-11-03 09:00:00','2026-11-03 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(143,35,'2026-11-03',3,'2026-11-03 09:00:00','2026-11-03 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(144,36,'2026-11-03',3,'2026-11-03 09:00:00','2026-11-03 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(145,25,'2026-11-04',3,'2026-11-04 09:00:00','2026-11-04 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(146,26,'2026-11-04',3,'2026-11-04 09:00:00','2026-11-04 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(147,27,'2026-11-04',3,'2026-11-04 09:00:00','2026-11-04 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(148,28,'2026-11-04',3,'2026-11-04 09:00:00','2026-11-04 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(149,29,'2026-11-04',3,'2026-11-04 09:00:00','2026-11-04 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(150,30,'2026-11-04',3,'2026-11-04 09:00:00','2026-11-04 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(151,31,'2026-11-04',3,'2026-11-04 09:00:00','2026-11-04 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(152,32,'2026-11-04',3,'2026-11-04 09:00:00','2026-11-04 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(153,33,'2026-11-04',3,'2026-11-04 09:00:00','2026-11-04 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(154,34,'2026-11-04',3,'2026-11-04 09:00:00','2026-11-04 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(155,35,'2026-11-04',3,'2026-11-04 09:00:00','2026-11-04 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(156,36,'2026-11-04',3,'2026-11-04 09:00:00','2026-11-04 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(157,25,'2026-11-05',3,'2026-11-05 09:00:00','2026-11-05 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(158,26,'2026-11-05',3,'2026-11-05 09:00:00','2026-11-05 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(159,27,'2026-11-05',3,'2026-11-05 09:00:00','2026-11-05 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(160,28,'2026-11-05',3,'2026-11-05 09:00:00','2026-11-05 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(161,29,'2026-11-05',3,'2026-11-05 09:00:00','2026-11-05 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(162,30,'2026-11-05',3,'2026-11-05 09:00:00','2026-11-05 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(163,31,'2026-11-05',3,'2026-11-05 09:00:00','2026-11-05 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(164,32,'2026-11-05',3,'2026-11-05 09:00:00','2026-11-05 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(165,33,'2026-11-05',3,'2026-11-05 09:00:00','2026-11-05 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(166,34,'2026-11-05',3,'2026-11-05 09:00:00','2026-11-05 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(167,35,'2026-11-05',3,'2026-11-05 09:00:00','2026-11-05 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(168,36,'2026-11-05',3,'2026-11-05 09:00:00','2026-11-05 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(169,25,'2026-11-06',3,'2026-11-06 09:00:00','2026-11-06 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(170,26,'2026-11-06',3,'2026-11-06 09:00:00','2026-11-06 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(171,27,'2026-11-06',3,'2026-11-06 09:00:00','2026-11-06 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(172,28,'2026-11-06',3,'2026-11-06 09:00:00','2026-11-06 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(173,29,'2026-11-06',3,'2026-11-06 09:00:00','2026-11-06 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(174,30,'2026-11-06',3,'2026-11-06 09:00:00','2026-11-06 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(175,31,'2026-11-06',3,'2026-11-06 09:00:00','2026-11-06 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(176,32,'2026-11-06',3,'2026-11-06 09:00:00','2026-11-06 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(177,33,'2026-11-06',3,'2026-11-06 09:00:00','2026-11-06 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(178,34,'2026-11-06',3,'2026-11-06 09:00:00','2026-11-06 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(179,35,'2026-11-06',3,'2026-11-06 09:00:00','2026-11-06 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(180,36,'2026-11-06',3,'2026-11-06 09:00:00','2026-11-06 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(181,25,'2026-11-09',3,'2026-11-09 09:00:00','2026-11-09 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(182,26,'2026-11-09',3,'2026-11-09 09:00:00','2026-11-09 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(183,27,'2026-11-09',3,'2026-11-09 09:00:00','2026-11-09 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(184,28,'2026-11-09',3,'2026-11-09 09:00:00','2026-11-09 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(185,29,'2026-11-09',3,'2026-11-09 09:00:00','2026-11-09 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(186,30,'2026-11-09',3,'2026-11-09 09:00:00','2026-11-09 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(187,31,'2026-11-09',3,'2026-11-09 09:00:00','2026-11-09 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(188,32,'2026-11-09',3,'2026-11-09 09:00:00','2026-11-09 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(189,33,'2026-11-09',3,'2026-11-09 09:00:00','2026-11-09 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(190,34,'2026-11-09',3,'2026-11-09 09:00:00','2026-11-09 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(191,35,'2026-11-09',3,'2026-11-09 09:00:00','2026-11-09 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(192,36,'2026-11-09',3,'2026-11-09 09:00:00','2026-11-09 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(193,25,'2026-11-10',3,'2026-11-10 09:00:00','2026-11-10 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(194,26,'2026-11-10',3,'2026-11-10 09:00:00','2026-11-10 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(195,27,'2026-11-10',3,'2026-11-10 09:00:00','2026-11-10 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(196,28,'2026-11-10',3,'2026-11-10 09:00:00','2026-11-10 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(197,29,'2026-11-10',3,'2026-11-10 09:00:00','2026-11-10 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(198,30,'2026-11-10',3,'2026-11-10 09:00:00','2026-11-10 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(199,31,'2026-11-10',3,'2026-11-10 09:00:00','2026-11-10 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(200,32,'2026-11-10',3,'2026-11-10 09:00:00','2026-11-10 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(201,33,'2026-11-10',3,'2026-11-10 09:00:00','2026-11-10 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(202,34,'2026-11-10',3,'2026-11-10 09:00:00','2026-11-10 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(203,35,'2026-11-10',3,'2026-11-10 09:00:00','2026-11-10 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(204,36,'2026-11-10',3,'2026-11-10 09:00:00','2026-11-10 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(205,25,'2026-11-11',3,'2026-11-11 09:00:00','2026-11-11 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(206,26,'2026-11-11',3,'2026-11-11 09:00:00','2026-11-11 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(207,27,'2026-11-11',3,'2026-11-11 09:00:00','2026-11-11 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(208,28,'2026-11-11',3,'2026-11-11 09:00:00','2026-11-11 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(209,29,'2026-11-11',3,'2026-11-11 09:00:00','2026-11-11 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(210,30,'2026-11-11',3,'2026-11-11 09:00:00','2026-11-11 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(211,31,'2026-11-11',3,'2026-11-11 09:00:00','2026-11-11 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(212,32,'2026-11-11',3,'2026-11-11 09:00:00','2026-11-11 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(213,33,'2026-11-11',3,'2026-11-11 09:00:00','2026-11-11 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(214,34,'2026-11-11',3,'2026-11-11 09:00:00','2026-11-11 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(215,35,'2026-11-11',3,'2026-11-11 09:00:00','2026-11-11 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(216,36,'2026-11-11',3,'2026-11-11 09:00:00','2026-11-11 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(217,25,'2026-11-12',3,'2026-11-12 09:00:00','2026-11-12 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(218,26,'2026-11-12',3,'2026-11-12 09:00:00','2026-11-12 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(219,27,'2026-11-12',3,'2026-11-12 09:00:00','2026-11-12 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(220,28,'2026-11-12',3,'2026-11-12 09:00:00','2026-11-12 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(221,29,'2026-11-12',3,'2026-11-12 09:00:00','2026-11-12 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(222,30,'2026-11-12',3,'2026-11-12 09:00:00','2026-11-12 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(223,31,'2026-11-12',3,'2026-11-12 09:00:00','2026-11-12 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(224,32,'2026-11-12',3,'2026-11-12 09:00:00','2026-11-12 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(225,33,'2026-11-12',3,'2026-11-12 09:00:00','2026-11-12 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(226,34,'2026-11-12',3,'2026-11-12 09:00:00','2026-11-12 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(227,35,'2026-11-12',3,'2026-11-12 09:00:00','2026-11-12 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(228,36,'2026-11-12',3,'2026-11-12 09:00:00','2026-11-12 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(229,25,'2026-11-13',3,'2026-11-13 09:00:00','2026-11-13 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(230,26,'2026-11-13',3,'2026-11-13 09:00:00','2026-11-13 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(231,27,'2026-11-13',3,'2026-11-13 09:00:00','2026-11-13 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(232,28,'2026-11-13',3,'2026-11-13 09:00:00','2026-11-13 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(233,29,'2026-11-13',3,'2026-11-13 09:00:00','2026-11-13 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(234,30,'2026-11-13',3,'2026-11-13 09:00:00','2026-11-13 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(235,31,'2026-11-13',3,'2026-11-13 09:00:00','2026-11-13 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(236,32,'2026-11-13',3,'2026-11-13 09:00:00','2026-11-13 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(237,33,'2026-11-13',3,'2026-11-13 09:00:00','2026-11-13 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(238,34,'2026-11-13',3,'2026-11-13 09:00:00','2026-11-13 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(239,35,'2026-11-13',3,'2026-11-13 09:00:00','2026-11-13 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(240,36,'2026-11-13',3,'2026-11-13 09:00:00','2026-11-13 17:00:00',8.00,0.00,'PRESENT',0,0,0,0,NULL,NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance_corrections`
--

DROP TABLE IF EXISTS `attendance_corrections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance_corrections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `attendance_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `requested_check_in` datetime NOT NULL,
  `requested_check_out` datetime DEFAULT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `approved_by` int DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `approved_by` (`approved_by`),
  KEY `ix_attendance_corrections_attendance_id` (`attendance_id`),
  KEY `ix_attendance_corrections_employee_id` (`employee_id`),
  KEY `ix_attendance_corrections_organization_id` (`organization_id`),
  KEY `ix_attendance_corrections_status` (`status`),
  CONSTRAINT `attendance_corrections_ibfk_1` FOREIGN KEY (`approved_by`) REFERENCES `employees` (`id`) ON DELETE SET NULL,
  CONSTRAINT `attendance_corrections_ibfk_2` FOREIGN KEY (`attendance_id`) REFERENCES `attendance` (`id`) ON DELETE CASCADE,
  CONSTRAINT `attendance_corrections_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `attendance_corrections_ibfk_4` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance_corrections`
--

LOCK TABLES `attendance_corrections` WRITE;
/*!40000 ALTER TABLE `attendance_corrections` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance_corrections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `action` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `old_values` text COLLATE utf8mb4_unicode_ci,
  `new_values` text COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_audit_logs_action` (`action`),
  KEY `ix_audit_logs_created_at` (`created_at`),
  KEY `ix_audit_logs_entity_name` (`entity_name`),
  KEY `ix_audit_logs_organization_id` (`organization_id`),
  KEY `ix_audit_logs_user_id` (`user_id`),
  CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `audit_logs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,1,'LOGIN','Auth',NULL,NULL,'User signed in successfully from 127.0.0.1','127.0.0.1',NULL,'2026-11-14 17:07:37',1),(2,1,'UPDATE','Policy',NULL,NULL,'Updated weekend policy to Saturday, Sunday','127.0.0.1',NULL,'2026-11-14 17:07:37',1),(3,9,'APPROVE','LeaveRequest',NULL,NULL,'Approved medical leave for David Kim (APEX-0005)','127.0.0.1',NULL,'2026-11-14 17:07:37',1),(4,8,'PROCESS','PayrollPeriod',NULL,NULL,'Finalized payroll cycle for October 2026','127.0.0.1',NULL,'2026-11-14 17:07:37',1),(5,1,'CREATE','UserInvitation',NULL,NULL,'Created employee invitation for new team hire','127.0.0.1',NULL,'2026-11-14 17:07:37',1);
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_department_code_org` (`code`,`organization_id`),
  KEY `manager_id` (`manager_id`),
  KEY `parent_id` (`parent_id`),
  KEY `ix_departments_is_deleted` (`is_deleted`),
  KEY `ix_departments_name` (`name`),
  KEY `ix_departments_organization_id` (`organization_id`),
  CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `employees` (`id`) ON DELETE SET NULL,
  CONSTRAINT `departments_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `departments_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Engineering & Technology','ENG-CORP-01','Apex Corp Software Engineering Division',NULL,NULL,1,'2026-11-14 16:07:48','2026-11-14 16:07:48',1,0,NULL),(19,'Engineering','ENG','Core software development and platform engineering',NULL,27,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(20,'Product & Design','PRD','Product management, UI/UX research, and systems design',NULL,NULL,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(21,'Human Resources','HRD','Talent acquisition, employee experience, and compliance',NULL,NULL,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(22,'Finance & Operations','FIN','Corporate accounting, financial planning, and legal',NULL,NULL,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(23,'Sales & Marketing','SLS','Global enterprise sales and developer relations',NULL,NULL,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(24,'Computer Science & Engineering','CSE','Undergraduate and postgraduate computer systems',NULL,NULL,1,'2026-11-14 17:07:37','2026-11-14 17:07:37',2,0,NULL),(25,'School of Medicine','MED','Clinical research, pharmacology, and anatomy',NULL,NULL,1,'2026-11-14 17:07:37','2026-11-14 17:07:37',2,0,NULL),(26,'Department of Humanities','HUM','Literature, philosophy, and history',NULL,NULL,1,'2026-11-14 17:07:37','2026-11-14 17:07:37',2,0,NULL),(27,'Dean of Academic Affairs','ACAD','Faculty oversight and institutional accreditation',NULL,NULL,1,'2026-11-14 17:07:37','2026-11-14 17:07:37',2,0,NULL);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designations`
--

DROP TABLE IF EXISTS `designations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_designation_code_org` (`code`,`organization_id`),
  KEY `department_id` (`department_id`),
  KEY `ix_designations_is_deleted` (`is_deleted`),
  KEY `ix_designations_name` (`name`),
  KEY `ix_designations_organization_id` (`organization_id`),
  CONSTRAINT `designations_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL,
  CONSTRAINT `designations_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designations`
--

LOCK TABLES `designations` WRITE;
/*!40000 ALTER TABLE `designations` DISABLE KEYS */;
INSERT INTO `designations` VALUES (31,'Engineering Manager','ENG-MGR',NULL,'M3',19,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(32,'Lead Software Architect','LEAD-ARCH',NULL,'L4',19,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(33,'Senior Software Engineer','SR-ENG',NULL,'L3',19,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(34,'Software Engineer','JR-ENG',NULL,'L2',19,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(35,'Lead Product Designer','PRD-DES',NULL,'L3',20,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(36,'HR Director','HR-DIR',NULL,'M3',21,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(37,'HR Generalist','HR-GEN',NULL,'L2',21,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(38,'Chief Financial Officer','CFO',NULL,'EXEC',22,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(39,'Senior Accountant','SR-ACC',NULL,'L3',22,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(40,'Enterprise Account Executive','ACC-EXEC',NULL,'L3',23,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL);
/*!40000 ALTER TABLE `designations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_documents`
--

DROP TABLE IF EXISTS `employee_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `document_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_size_bytes` int DEFAULT NULL,
  `mime_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verification_status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_employee_documents_employee_id` (`employee_id`),
  KEY `ix_employee_documents_is_deleted` (`is_deleted`),
  KEY `ix_employee_documents_organization_id` (`organization_id`),
  CONSTRAINT `employee_documents_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `employee_documents_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_documents`
--

LOCK TABLES `employee_documents` WRITE;
/*!40000 ALTER TABLE `employee_documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_salary_assignments`
--

DROP TABLE IF EXISTS `employee_salary_assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_salary_assignments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `salary_structure_id` int NOT NULL,
  `base_salary` decimal(12,2) NOT NULL,
  `effective_from` date NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`),
  KEY `salary_structure_id` (`salary_structure_id`),
  KEY `ix_employee_salary_assignments_is_deleted` (`is_deleted`),
  KEY `ix_employee_salary_assignments_organization_id` (`organization_id`),
  CONSTRAINT `employee_salary_assignments_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `employee_salary_assignments_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `employee_salary_assignments_ibfk_3` FOREIGN KEY (`salary_structure_id`) REFERENCES `salary_structures` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_salary_assignments`
--

LOCK TABLES `employee_salary_assignments` WRITE;
/*!40000 ALTER TABLE `employee_salary_assignments` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_salary_assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_shift_assignments`
--

DROP TABLE IF EXISTS `employee_shift_assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_shift_assignments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `shift_id` int NOT NULL,
  `effective_from` date NOT NULL,
  `effective_to` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_employee_shift_assignments_employee_id` (`employee_id`),
  KEY `ix_employee_shift_assignments_organization_id` (`organization_id`),
  KEY `ix_employee_shift_assignments_shift_id` (`shift_id`),
  CONSTRAINT `employee_shift_assignments_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `employee_shift_assignments_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `employee_shift_assignments_ibfk_3` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_shift_assignments`
--

LOCK TABLES `employee_shift_assignments` WRITE;
/*!40000 ALTER TABLE `employee_shift_assignments` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_shift_assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `employee_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `work_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `date_of_joining` date NOT NULL,
  `date_of_exit` date DEFAULT NULL,
  `employment_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department_id` int DEFAULT NULL,
  `designation_id` int DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  `bank_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_account_no` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_ifsc_or_routing` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax_id_or_pan` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emergency_contact_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emergency_contact_phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_employee_code_org` (`employee_code`,`organization_id`),
  UNIQUE KEY `uq_employee_work_email_org` (`work_email`,`organization_id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `ix_employees_department_id` (`department_id`),
  KEY `ix_employees_designation_id` (`designation_id`),
  KEY `ix_employees_employee_code` (`employee_code`),
  KEY `ix_employees_is_deleted` (`is_deleted`),
  KEY `ix_employees_manager_id` (`manager_id`),
  KEY `ix_employees_organization_id` (`organization_id`),
  KEY `ix_employees_status` (`status`),
  KEY `ix_employees_work_email` (`work_email`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`designation_id`) REFERENCES `designations` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `employees_ibfk_3` FOREIGN KEY (`manager_id`) REFERENCES `employees` (`id`) ON DELETE SET NULL,
  CONSTRAINT `employees_ibfk_4` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `employees_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (25,1,'APEX-0001','Arthur','Pendleton','admin@apexcorp.io',NULL,NULL,NULL,NULL,'2024-01-15',NULL,'FULL_TIME','ACTIVE',22,38,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(26,8,'APEX-0002','Claire','Higgins','hr@apexcorp.io',NULL,NULL,NULL,NULL,'2024-01-15',NULL,'FULL_TIME','ACTIVE',21,36,25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(27,9,'APEX-0003','Marcus','Vance','manager@apexcorp.io',NULL,NULL,NULL,NULL,'2024-01-15',NULL,'FULL_TIME','ACTIVE',19,31,25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(28,10,'APEX-0004','Sarah','Jenkins','employee@apexcorp.io',NULL,NULL,NULL,NULL,'2024-01-15',NULL,'FULL_TIME','ACTIVE',19,33,27,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(29,NULL,'APEX-0005','David','Kim','david.kim@apexcorp.io',NULL,NULL,NULL,NULL,'2024-01-15',NULL,'FULL_TIME','ACTIVE',19,32,27,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(30,NULL,'APEX-0006','Priya','Sharma','priya.sharma@apexcorp.io',NULL,NULL,NULL,NULL,'2024-01-15',NULL,'FULL_TIME','ACTIVE',19,33,27,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(31,NULL,'APEX-0007','James','Wilson','james.wilson@apexcorp.io',NULL,NULL,NULL,NULL,'2024-01-15',NULL,'FULL_TIME','ACTIVE',19,34,27,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(32,NULL,'APEX-0008','Elena','Rostova','elena.rostova@apexcorp.io',NULL,NULL,NULL,NULL,'2024-01-15',NULL,'FULL_TIME','ACTIVE',20,35,25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(33,NULL,'APEX-0009','Thomas','Wright','thomas.wright@apexcorp.io',NULL,NULL,NULL,NULL,'2024-01-15',NULL,'FULL_TIME','ACTIVE',22,39,25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(34,NULL,'APEX-0010','Aisha','Patel','aisha.patel@apexcorp.io',NULL,NULL,NULL,NULL,'2024-01-15',NULL,'FULL_TIME','ACTIVE',23,40,25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(35,NULL,'APEX-0011','Lucas','Meyer','lucas.meyer@apexcorp.io',NULL,NULL,NULL,NULL,'2024-01-15',NULL,'FULL_TIME','ACTIVE',19,34,27,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(36,NULL,'APEX-0012','Hannah','Abbott','hannah.abbott@apexcorp.io',NULL,NULL,NULL,NULL,'2024-01-15',NULL,'FULL_TIME','ACTIVE',21,37,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holidays`
--

DROP TABLE IF EXISTS `holidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holidays` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_optional` tinyint(1) NOT NULL,
  `applies_to_department_id` int DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_holiday_date_org` (`date`,`organization_id`),
  KEY `applies_to_department_id` (`applies_to_department_id`),
  KEY `ix_holidays_date` (`date`),
  KEY `ix_holidays_is_deleted` (`is_deleted`),
  KEY `ix_holidays_organization_id` (`organization_id`),
  CONSTRAINT `holidays_ibfk_1` FOREIGN KEY (`applies_to_department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `holidays_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holidays`
--

LOCK TABLES `holidays` WRITE;
/*!40000 ALTER TABLE `holidays` DISABLE KEYS */;
INSERT INTO `holidays` VALUES (1,'Thanksgiving Day','2026-11-26','Official corporate holiday for Thanksgiving Day',0,NULL,1,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(2,'Day After Thanksgiving','2026-11-27','Official corporate holiday for Day After Thanksgiving',0,NULL,1,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(3,'Christmas Eve','2026-12-24','Official corporate holiday for Christmas Eve',0,NULL,1,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(4,'Christmas Day','2026-12-25','Official corporate holiday for Christmas Day',0,NULL,1,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(5,'New Year\'s Day','2027-01-01','Official corporate holiday for New Year\'s Day',0,NULL,1,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL),(6,'Martin Luther King Jr. Day','2027-01-18','Official corporate holiday for Martin Luther King Jr. Day',0,NULL,1,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL);
/*!40000 ALTER TABLE `holidays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_approvals`
--

DROP TABLE IF EXISTS `leave_approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_approvals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `leave_request_id` int NOT NULL,
  `approver_id` int NOT NULL,
  `level` int NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comments` text COLLATE utf8mb4_unicode_ci,
  `approved_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_leave_approvals_approver_id` (`approver_id`),
  KEY `ix_leave_approvals_leave_request_id` (`leave_request_id`),
  KEY `ix_leave_approvals_organization_id` (`organization_id`),
  KEY `ix_leave_approvals_status` (`status`),
  CONSTRAINT `leave_approvals_ibfk_1` FOREIGN KEY (`approver_id`) REFERENCES `employees` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `leave_approvals_ibfk_2` FOREIGN KEY (`leave_request_id`) REFERENCES `leave_requests` (`id`) ON DELETE CASCADE,
  CONSTRAINT `leave_approvals_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_approvals`
--

LOCK TABLES `leave_approvals` WRITE;
/*!40000 ALTER TABLE `leave_approvals` DISABLE KEYS */;
INSERT INTO `leave_approvals` VALUES (2,9,27,1,'APPROVED','Approved, get well soon.','2026-11-03 11:37:37','2026-11-14 17:07:37','2026-11-14 17:07:37',1),(3,7,27,1,'APPROVED','Approved via dashboard quick action','2026-11-14 11:39:29','2026-11-14 17:09:29','2026-11-14 17:09:29',1),(4,8,27,1,'APPROVED','Approved via dashboard quick action','2026-11-14 11:40:08','2026-11-14 17:10:08','2026-11-14 17:10:08',1);
/*!40000 ALTER TABLE `leave_approvals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_balances`
--

DROP TABLE IF EXISTS `leave_balances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_balances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `leave_type_id` int NOT NULL,
  `year` int NOT NULL,
  `allocated_days` decimal(5,1) NOT NULL,
  `used_days` decimal(5,1) NOT NULL,
  `pending_days` decimal(5,1) NOT NULL,
  `carry_forwarded_days` decimal(5,1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_employee_leave_year` (`employee_id`,`leave_type_id`,`year`),
  KEY `ix_leave_balances_employee_id` (`employee_id`),
  KEY `ix_leave_balances_leave_type_id` (`leave_type_id`),
  KEY `ix_leave_balances_organization_id` (`organization_id`),
  KEY `ix_leave_balances_year` (`year`),
  CONSTRAINT `leave_balances_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `leave_balances_ibfk_2` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_types` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `leave_balances_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_balances`
--

LOCK TABLES `leave_balances` WRITE;
/*!40000 ALTER TABLE `leave_balances` DISABLE KEYS */;
INSERT INTO `leave_balances` VALUES (97,25,9,2026,12.0,2.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(98,25,10,2026,10.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(99,25,11,2026,18.0,1.0,0.0,2.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(100,25,12,2026,90.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(101,26,9,2026,12.0,2.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(102,26,10,2026,10.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(103,26,11,2026,18.0,1.0,0.0,2.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(104,26,12,2026,90.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(105,27,9,2026,12.0,2.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(106,27,10,2026,10.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(107,27,11,2026,18.0,1.0,0.0,2.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(108,27,12,2026,90.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(109,28,9,2026,12.0,2.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(110,28,10,2026,10.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(111,28,11,2026,18.0,4.0,0.0,2.0,'2026-11-14 17:07:36','2026-11-14 17:09:29',1),(112,28,12,2026,90.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(113,29,9,2026,12.0,2.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(114,29,10,2026,10.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(115,29,11,2026,18.0,1.0,0.0,2.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(116,29,12,2026,90.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(117,30,9,2026,12.0,3.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:10:08',1),(118,30,10,2026,10.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(119,30,11,2026,18.0,1.0,0.0,2.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(120,30,12,2026,90.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(121,31,9,2026,12.0,2.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(122,31,10,2026,10.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(123,31,11,2026,18.0,1.0,0.0,2.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(124,31,12,2026,90.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(125,32,9,2026,12.0,2.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(126,32,10,2026,10.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(127,32,11,2026,18.0,1.0,0.0,2.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(128,32,12,2026,90.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(129,33,9,2026,12.0,2.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(130,33,10,2026,10.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(131,33,11,2026,18.0,1.0,0.0,2.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(132,33,12,2026,90.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(133,34,9,2026,12.0,2.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(134,34,10,2026,10.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(135,34,11,2026,18.0,1.0,0.0,2.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(136,34,12,2026,90.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(137,35,9,2026,12.0,2.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(138,35,10,2026,10.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(139,35,11,2026,18.0,1.0,0.0,2.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(140,35,12,2026,90.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(141,36,9,2026,12.0,2.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(142,36,10,2026,10.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(143,36,11,2026,18.0,1.0,0.0,2.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1),(144,36,12,2026,90.0,1.0,0.0,0.0,'2026-11-14 17:07:36','2026-11-14 17:07:36',1);
/*!40000 ALTER TABLE `leave_balances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_policies`
--

DROP TABLE IF EXISTS `leave_policies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_policies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `leave_type_id` int NOT NULL,
  `department_id` int DEFAULT NULL,
  `max_consecutive_days` int NOT NULL,
  `notice_period_days` int NOT NULL,
  `allow_half_day` tinyint(1) NOT NULL,
  `allow_negative_balance` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_leave_policies_department_id` (`department_id`),
  KEY `ix_leave_policies_leave_type_id` (`leave_type_id`),
  KEY `ix_leave_policies_organization_id` (`organization_id`),
  CONSTRAINT `leave_policies_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `leave_policies_ibfk_2` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `leave_policies_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_policies`
--

LOCK TABLES `leave_policies` WRITE;
/*!40000 ALTER TABLE `leave_policies` DISABLE KEYS */;
/*!40000 ALTER TABLE `leave_policies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_requests`
--

DROP TABLE IF EXISTS `leave_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `leave_type_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `is_half_day` tinyint(1) NOT NULL,
  `half_day_period` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_days` decimal(5,1) NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_leave_requests_employee_id` (`employee_id`),
  KEY `ix_leave_requests_end_date` (`end_date`),
  KEY `ix_leave_requests_is_deleted` (`is_deleted`),
  KEY `ix_leave_requests_leave_type_id` (`leave_type_id`),
  KEY `ix_leave_requests_organization_id` (`organization_id`),
  KEY `ix_leave_requests_start_date` (`start_date`),
  KEY `ix_leave_requests_status` (`status`),
  CONSTRAINT `leave_requests_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `leave_requests_ibfk_2` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_types` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `leave_requests_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_requests`
--

LOCK TABLES `leave_requests` WRITE;
/*!40000 ALTER TABLE `leave_requests` DISABLE KEYS */;
INSERT INTO `leave_requests` VALUES (7,28,11,'2026-11-19','2026-11-21',0,NULL,3.0,'Annual family vacation and family gathering','APPROVED',NULL,'2026-11-14 17:07:36','2026-11-14 17:09:29',1,0,NULL),(8,30,9,'2026-11-16','2026-11-16',0,NULL,1.0,'Personal administrative appointment','APPROVED',NULL,'2026-11-14 17:07:36','2026-11-14 17:10:08',1,0,NULL),(9,29,10,'2026-11-04','2026-11-05',0,NULL,2.0,'Viral fever recovery','APPROVED',NULL,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL);
/*!40000 ALTER TABLE `leave_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_types`
--

DROP TABLE IF EXISTS `leave_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_paid` tinyint(1) NOT NULL,
  `default_days_per_year` decimal(5,1) NOT NULL,
  `carry_forward_limit` decimal(5,1) NOT NULL,
  `requires_approval` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_leave_type_code_org` (`code`,`organization_id`),
  KEY `ix_leave_types_is_deleted` (`is_deleted`),
  KEY `ix_leave_types_organization_id` (`organization_id`),
  CONSTRAINT `leave_types_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_types`
--

LOCK TABLES `leave_types` WRITE;
/*!40000 ALTER TABLE `leave_types` DISABLE KEYS */;
INSERT INTO `leave_types` VALUES (9,'Casual Leave','CL',NULL,1,12.0,0.0,1,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(10,'Sick Leave','SL',NULL,1,10.0,5.0,1,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(11,'Paid Annual Leave','PL',NULL,1,18.0,5.0,1,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL),(12,'Parental / Maternity','ML',NULL,1,90.0,0.0,1,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL);
/*!40000 ALTER TABLE `leave_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_preferences`
--

DROP TABLE IF EXISTS `notification_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_preferences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `email_notifications` tinyint(1) NOT NULL,
  `in_app_notifications` tinyint(1) NOT NULL,
  `leave_updates` tinyint(1) NOT NULL,
  `payroll_updates` tinyint(1) NOT NULL,
  `attendance_reminders` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `uq_user_notif_pref_org` (`user_id`,`organization_id`),
  KEY `ix_notification_preferences_organization_id` (`organization_id`),
  CONSTRAINT `notification_preferences_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notification_preferences_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_preferences`
--

LOCK TABLES `notification_preferences` WRITE;
/*!40000 ALTER TABLE `notification_preferences` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notification_type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL,
  `read_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_notifications_is_read` (`is_read`),
  KEY `ix_notifications_organization_id` (`organization_id`),
  KEY `ix_notifications_user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization_settings`
--

DROP TABLE IF EXISTS `organization_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organization_id` int NOT NULL,
  `fiscal_year_start` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `work_week_start` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weekend_days` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timezone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_format` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auto_attendance_approval` tinyint(1) NOT NULL,
  `allow_remote_checkin` tinyint(1) NOT NULL,
  `ip_restriction_enabled` tinyint(1) NOT NULL,
  `allowed_ip_ranges` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `employee_id_prefix` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'EMP-',
  `work_start_time` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '09:00',
  `work_end_time` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '18:00',
  `policies` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `organization_id` (`organization_id`),
  KEY `ix_organization_settings_id` (`id`),
  CONSTRAINT `organization_settings_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization_settings`
--

LOCK TABLES `organization_settings` WRITE;
/*!40000 ALTER TABLE `organization_settings` DISABLE KEYS */;
INSERT INTO `organization_settings` VALUES (1,1,'01-01','Monday','Saturday,Sunday','USD','America/Los_Angeles','YYYY-MM-DD',0,1,0,NULL,'2026-11-14 16:01:53','2026-11-14 16:01:53','EMP-','09:00','18:00',NULL),(2,2,'07-01','Monday','Sunday','USD','America/New_York','YYYY-MM-DD',0,1,0,NULL,'2026-11-14 16:01:53','2026-11-14 16:01:53','EMP-','09:00','18:00',NULL);
/*!40000 ALTER TABLE `organization_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `org_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `contact_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_organizations_code` (`code`),
  UNIQUE KEY `ix_organizations_slug` (`slug`),
  KEY `ix_organizations_id` (`id`),
  KEY `ix_organizations_is_deleted` (`is_deleted`),
  KEY `ix_organizations_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (1,'Apex Corporate Technologies','APEX-CORP','apex-corp','COMPANY','apexcorp.io',NULL,'100 Innovation Way, Suite 400, San Francisco, CA','admin@apexcorp.io','+1-555-019-2834',1,'2026-11-14 16:01:53','2026-11-14 16:01:53',0,NULL),(2,'St. John\'s University & Medical College','STJOHN-UNIV','stjohn-univ','COLLEGE','stjohns.edu',NULL,'750 University Blvd, Cambridge, MA','registrar@stjohns.edu','+1-555-018-9921',1,'2026-11-14 16:01:53','2026-11-14 16:01:53',0,NULL);
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_used` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_password_resets_token` (`token`),
  KEY `ix_password_resets_is_used` (`is_used`),
  KEY `ix_password_resets_user_id` (`user_id`),
  CONSTRAINT `password_resets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
INSERT INTO `password_resets` VALUES (1,1,'HNEsCXJSq_eT1vq38rd0YMX3UukJpLo-M3sUXAOBw7Y','2026-11-14 12:08:55',1,'2026-11-14 16:38:55'),(2,1,'sWOO4gChEzApzym7_OijU3K_dSGVnoVCN7omZhZpmnI','2026-11-14 12:08:56',0,'2026-11-14 16:38:55'),(3,1,'0yXSuhktFcXK95buMFji1iuvSLv872u_ftCkrd11hYQ','2026-11-14 12:09:53',1,'2026-11-14 16:39:53'),(4,1,'YkqO0wZvpOPQqrE0jZDf1NEvBba0ipeKWupjJ-2J1lk','2026-11-14 12:09:53',0,'2026-11-14 16:39:53'),(5,1,'-4VvmE-1FI1dcRTE8evATkC8Maqexw_QvkAbdk45zGY','2026-11-14 12:11:11',1,'2026-11-14 16:41:11'),(6,1,'N3JntXrrooVc3MFTw7b4lZUcnGX00eTxosM3yjT08pQ','2026-11-14 12:11:45',1,'2026-11-14 16:41:45'),(7,1,'ZY6rUAwDGcN-1ZOkhZiRpcSo13wZZBf60gSt-NW0fQ8','2026-11-14 12:40:36',1,'2026-11-14 17:10:36'),(8,1,'dyKjJNbhxpcLF7-a08YfCcomydFS9fvIQxY1VWJSiGM','2026-11-14 12:47:38',1,'2026-11-14 17:17:38');
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_items`
--

DROP TABLE IF EXISTS `payroll_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payroll_record_id` int NOT NULL,
  `component_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `component_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `calculation_basis` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_payroll_items_organization_id` (`organization_id`),
  KEY `ix_payroll_items_payroll_record_id` (`payroll_record_id`),
  CONSTRAINT `payroll_items_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payroll_items_ibfk_2` FOREIGN KEY (`payroll_record_id`) REFERENCES `payroll_records` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_items`
--

LOCK TABLES `payroll_items` WRITE;
/*!40000 ALTER TABLE `payroll_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_periods`
--

DROP TABLE IF EXISTS `payroll_periods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll_periods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_days` int NOT NULL,
  `working_days` int NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `processed_by` int DEFAULT NULL,
  `approved_by` int DEFAULT NULL,
  `processed_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_payroll_period_org` (`name`,`organization_id`),
  KEY `approved_by` (`approved_by`),
  KEY `processed_by` (`processed_by`),
  KEY `ix_payroll_periods_end_date` (`end_date`),
  KEY `ix_payroll_periods_is_deleted` (`is_deleted`),
  KEY `ix_payroll_periods_organization_id` (`organization_id`),
  KEY `ix_payroll_periods_start_date` (`start_date`),
  KEY `ix_payroll_periods_status` (`status`),
  CONSTRAINT `payroll_periods_ibfk_1` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payroll_periods_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payroll_periods_ibfk_3` FOREIGN KEY (`processed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_periods`
--

LOCK TABLES `payroll_periods` WRITE;
/*!40000 ALTER TABLE `payroll_periods` DISABLE KEYS */;
INSERT INTO `payroll_periods` VALUES (2,'October 2026 Pay Run','2026-10-01','2026-10-31',31,22,'FINALIZED',NULL,NULL,NULL,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL);
/*!40000 ALTER TABLE `payroll_periods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_records`
--

DROP TABLE IF EXISTS `payroll_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payroll_period_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `days_present` decimal(5,1) NOT NULL,
  `days_absent` decimal(5,1) NOT NULL,
  `paid_leave_days` decimal(5,1) NOT NULL,
  `unpaid_leave_days` decimal(5,1) NOT NULL,
  `payable_days` decimal(5,1) NOT NULL,
  `base_salary` decimal(12,2) NOT NULL,
  `gross_pay` decimal(12,2) NOT NULL,
  `total_deductions` decimal(12,2) NOT NULL,
  `net_pay` decimal(12,2) NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_date` date DEFAULT NULL,
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_ref` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_locked` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_payroll_period_employee` (`payroll_period_id`,`employee_id`),
  KEY `ix_payroll_records_employee_id` (`employee_id`),
  KEY `ix_payroll_records_is_deleted` (`is_deleted`),
  KEY `ix_payroll_records_organization_id` (`organization_id`),
  KEY `ix_payroll_records_payroll_period_id` (`payroll_period_id`),
  KEY `ix_payroll_records_status` (`status`),
  CONSTRAINT `payroll_records_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `payroll_records_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payroll_records_ibfk_3` FOREIGN KEY (`payroll_period_id`) REFERENCES `payroll_periods` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_records`
--

LOCK TABLES `payroll_records` WRITE;
/*!40000 ALTER TABLE `payroll_records` DISABLE KEYS */;
INSERT INTO `payroll_records` VALUES (2,2,28,22.0,0.0,0.0,0.0,22.0,6250.00,10416.67,1979.17,8437.50,'FINALIZED',NULL,'BANK_TRANSFER',NULL,1,'2026-11-14 17:07:37','2026-11-14 17:07:37',1,0,NULL);
/*!40000 ALTER TABLE `payroll_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payslips`
--

DROP TABLE IF EXISTS `payslips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payslips` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payroll_record_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `payslip_number` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `generated_at` datetime NOT NULL,
  `download_count` int NOT NULL,
  `is_published` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payroll_record_id` (`payroll_record_id`),
  UNIQUE KEY `ix_payslips_payslip_number` (`payslip_number`),
  KEY `ix_payslips_employee_id` (`employee_id`),
  KEY `ix_payslips_organization_id` (`organization_id`),
  CONSTRAINT `payslips_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payslips_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payslips_ibfk_3` FOREIGN KEY (`payroll_record_id`) REFERENCES `payroll_records` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payslips`
--

LOCK TABLES `payslips` WRITE;
/*!40000 ALTER TABLE `payslips` DISABLE KEYS */;
INSERT INTO `payslips` VALUES (1,2,28,'PAY-0002-0028',NULL,'2026-11-14 11:37:38',0,1,'2026-11-14 17:07:37','2026-11-14 17:07:37',1);
/*!40000 ALTER TABLE `payslips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `module` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_permissions_code` (`code`),
  KEY `ix_permissions_module` (`module`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'org:manage','Manage Organization Settings','Organization',NULL),(2,'dept:manage','Manage Departments','Department',NULL),(3,'desig:manage','Manage Designations','Designation',NULL),(4,'employee:read','View Employees','Employee',NULL),(5,'employee:write','Create/Edit Employees','Employee',NULL),(6,'attendance:clock','Clock In / Clock Out','Attendance',NULL),(7,'attendance:manage','Manage Organization Attendance','Attendance',NULL),(8,'shift:manage','Manage Shifts & Schedules','Shift',NULL),(9,'leave:apply','Apply for Leave','Leave',NULL),(10,'leave:approve','Approve/Reject Leave Requests','Leave',NULL),(11,'salary:manage','Configure Salary Structures','Salary',NULL),(12,'payroll:process','Execute Payroll Pay Runs','Payroll',NULL),(13,'payslip:download','Download Payslips','Payroll',NULL),(14,'reports:view','Access Workforce Analytics','Reports',NULL),(15,'audit:view','Inspect Security Audit Trail','Audit',NULL);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_revoked` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_refresh_tokens_token` (`token`),
  KEY `ix_refresh_tokens_is_revoked` (`is_revoked`),
  KEY `ix_refresh_tokens_user_id` (`user_id`),
  CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES (1,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzk1MjU5MzMyLCJpYXQiOjE3OTQ2NTQ1MzIsInR5cGUiOiJyZWZyZXNoIn0.QQGlRxgKjmVtcHmbohPygU2YjuextuekhpFoHk8ayy4','2026-11-21 11:08:53',0,'2026-11-14 16:38:52'),(2,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzk1MjU5MzMzLCJpYXQiOjE3OTQ2NTQ1MzMsInR5cGUiOiJyZWZyZXNoIn0.wxjSiXf95NS1Idt7-vL8uc61YHttA_dippQlx-EY41Q','2026-11-21 11:08:53',0,'2026-11-14 16:38:53'),(4,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzk1MjU5MzM2LCJpYXQiOjE3OTQ2NTQ1MzYsInR5cGUiOiJyZWZyZXNoIn0.zOzY1AlJi3IVuPWCJJSqsw2saib7XR85HD5qJJyI1uI','2026-11-21 11:08:56',0,'2026-11-14 16:38:56'),(6,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZjgyNWYyZjMwODcwNGJhMDhjMGU1ODYwZDMxZTZiZGIiLCJleHAiOjE3OTUyNTkzNzAsImlhdCI6MTc5NDY1NDU3MCwidHlwZSI6InJlZnJlc2gifQ.uuWIIxLYfz75ljzaLZkWRSiY2WhKKRg-ZKcdcI9G8ps','2026-11-21 11:09:30',0,'2026-11-14 16:39:30'),(7,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwianRpIjoiNmZlYTkwODI2OTFiNDhiZDkzZmZjNGMyN2Y5YmY2MjMiLCJleHAiOjE3OTUyNTkzNzEsImlhdCI6MTc5NDY1NDU3MSwidHlwZSI6InJlZnJlc2gifQ.sG8HSymQSHP86uuhtfqOYyQoiDULPtrKPn5tNVwbXP4','2026-11-21 11:09:31',0,'2026-11-14 16:39:31'),(8,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiMDJmNTg5MTBhM2IwNGYwMTkxZWEyNGM1OWZiZWFhMDUiLCJleHAiOjE3OTUyNTkzOTMsImlhdCI6MTc5NDY1NDU5MywidHlwZSI6InJlZnJlc2gifQ.vSkcQb7wnEWzNdeCjo1HrXbf7mbYKFQ_MJL1DpE-SlE','2026-11-21 11:09:54',0,'2026-11-14 16:39:53'),(9,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiMjM2NWY0MjNhZjZkNDUzNThhMWQwMjg3NjE1NGU2ZDEiLCJleHAiOjE3OTUyNTkzOTQsImlhdCI6MTc5NDY1NDU5NCwidHlwZSI6InJlZnJlc2gifQ.715YZPO2Y6AyyyF7eFERyP-ncnh8oN8P9xxpl36Rpqw','2026-11-21 11:09:54',0,'2026-11-14 16:39:54'),(10,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwianRpIjoiNTM0N2UzYjNhMjY5NGMxNWE3NTA5ZmZhOWI3NDQ2NDciLCJleHAiOjE3OTUyNTkzOTQsImlhdCI6MTc5NDY1NDU5NCwidHlwZSI6InJlZnJlc2gifQ.8jqeb6pFD1BeQMdUx2aTZYTovrx4Iu6FrwTFfUxZ5TA','2026-11-21 11:09:55',0,'2026-11-14 16:39:54'),(11,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiNzg0M2RjOTY1YjZiNDc5NWFkMzJkZWNhMmNiYzA3NjMiLCJleHAiOjE3OTUyNTk0NjcsImlhdCI6MTc5NDY1NDY2NywidHlwZSI6InJlZnJlc2gifQ.Yci8xYGQTVgOOsCf73O_etLqbK_3pxMaDzS7iXzyD34','2026-11-21 11:11:08',0,'2026-11-14 16:41:07'),(12,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZDkwOGI0M2E0Y2E2NDFlOWJlOTRmZjBiZDdlMmU1ZjQiLCJleHAiOjE3OTUyNTk0NjgsImlhdCI6MTc5NDY1NDY2OCwidHlwZSI6InJlZnJlc2gifQ.cFWBWObUe9Gek7VSrh1jku0AQo8V3EMox1dCle0Ahe4','2026-11-21 11:11:09',0,'2026-11-14 16:41:08'),(13,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiNWZiMzMxYWJmODA2NDQ3OTllZjQ0NTdlZmUxZmM2ZmQiLCJleHAiOjE3OTUyNTk0NzAsImlhdCI6MTc5NDY1NDY3MCwidHlwZSI6InJlZnJlc2gifQ.kHOWK2Bns5FNr7bPSU1WezS76YrazAeDjOM7UFrYCYA','2026-11-21 11:11:10',1,'2026-11-14 16:41:10'),(14,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiMmMwMmM1ZjYzZmVhNGJmMDlkZmJkYjM3OWFjYTJlZWUiLCJleHAiOjE3OTUyNTk0NzAsImlhdCI6MTc5NDY1NDY3MCwidHlwZSI6InJlZnJlc2gifQ.DIqYglRFnH2lQrqBZpbYVSkYR0z35ccaCV7b05mPC_w','2026-11-21 11:11:10',0,'2026-11-14 16:41:10'),(15,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZDkxNDY4N2E1M2U0NGM1ZGIyYzUxYzc3NTI2ZGE3ODIiLCJleHAiOjE3OTUyNTk0NzEsImlhdCI6MTc5NDY1NDY3MSwidHlwZSI6InJlZnJlc2gifQ.gy5ViY6JsXGyGBA9x7VZMW3ctEgVm52y0SmABI3KyHs','2026-11-21 11:11:12',0,'2026-11-14 16:41:11'),(16,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiODE1NGZmOGE0YWZiNDMzZDgwNjVlZDY2Y2JlMzNmMjMiLCJleHAiOjE3OTUyNTk0NzMsImlhdCI6MTc5NDY1NDY3MywidHlwZSI6InJlZnJlc2gifQ.ymTxHiIn66typgygwk-Ja5vIwRrw0xAPzTOMvTaTeDU','2026-11-21 11:11:14',0,'2026-11-14 16:41:13'),(17,4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0IiwianRpIjoiNjE2MjQyNjdlMGYxNDhkZmJiYzlhYmQ5NTlkOWM2ZTMiLCJleHAiOjE3OTUyNTk0NzUsImlhdCI6MTc5NDY1NDY3NSwidHlwZSI6InJlZnJlc2gifQ.djFxMbWtnpeOv582d2UBgWeKObOiG18IPaMJ-a_-sps','2026-11-21 11:11:15',0,'2026-11-14 16:41:15'),(18,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZGM5ODgyOWQ5N2M3NDQ0Y2EyOWVhMTFmMjQ0MDg0NTYiLCJleHAiOjE3OTUyNTk0NzcsImlhdCI6MTc5NDY1NDY3NywidHlwZSI6InJlZnJlc2gifQ.QStxBQw1fCq7eNXNhtPc1oBOs56tthdmjXL9995sflY','2026-11-21 11:11:17',0,'2026-11-14 16:41:17'),(19,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwianRpIjoiYmViYjFhNzc0MWQzNDllOTliOTY4OTU3ZDFjNDM2NmMiLCJleHAiOjE3OTUyNTk0NzgsImlhdCI6MTc5NDY1NDY3OCwidHlwZSI6InJlZnJlc2gifQ.u9IYr_UVws0Psi7oOtBXwlaFerpMOnzZxILTX0ycWUg','2026-11-21 11:11:18',0,'2026-11-14 16:41:18'),(20,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZGJhYmEwNWMyMzEwNGU4NTk1MWY4MmQ5NzAxNzNkN2YiLCJleHAiOjE3OTUyNTk1MDIsImlhdCI6MTc5NDY1NDcwMiwidHlwZSI6InJlZnJlc2gifQ.IYzwNpBfYzuIGkOB00deM8mAWZz57QTKYb5sjeX-E0Q','2026-11-21 11:11:43',0,'2026-11-14 16:41:42'),(21,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiNzA3OThmMjFkYTY1NGQ5Nzg0ZmRlNTBhZDRhNWM1Y2YiLCJleHAiOjE3OTUyNTk1MDMsImlhdCI6MTc5NDY1NDcwMywidHlwZSI6InJlZnJlc2gifQ.66YfDxUKmvBMHYV_ksZSPcw-zNwlfG2be4U9X6S1xC4','2026-11-21 11:11:44',0,'2026-11-14 16:41:43'),(22,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiODU1ODM2MDViYjVkNGU1NzgxZWYyZDE4YWMxNGI1OGUiLCJleHAiOjE3OTUyNTk1MDQsImlhdCI6MTc5NDY1NDcwNCwidHlwZSI6InJlZnJlc2gifQ.7bMYEU1VoOJE3KRTwBebo2SaimpVt2aGwsEydj-VZZk','2026-11-21 11:11:45',1,'2026-11-14 16:41:44'),(23,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZTcxYTJkYTBiNmM1NDA4Y2JhODM0NDQ2Yjc2YTBkZTMiLCJleHAiOjE3OTUyNTk1MDQsImlhdCI6MTc5NDY1NDcwNCwidHlwZSI6InJlZnJlc2gifQ.QS0ofipzirZcbr-o6ocxDmITY3szjbO8et1geV8s9TI','2026-11-21 11:11:45',0,'2026-11-14 16:41:44'),(24,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiYzY2OGNhYjU1YmVkNDFhNGI2NzkzNzYyN2M5ZThjMDciLCJleHAiOjE3OTUyNTk1MDYsImlhdCI6MTc5NDY1NDcwNiwidHlwZSI6InJlZnJlc2gifQ.-4zevw__s_c-PEDSOTbhM_Lrer04zBhwBXcl9VZjTpQ','2026-11-21 11:11:46',0,'2026-11-14 16:41:46'),(25,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiNGNiMTRkNDI5M2Q3NGVmNGJmNmU3N2FkNjczOWMyZTYiLCJleHAiOjE3OTUyNTk1MDcsImlhdCI6MTc5NDY1NDcwNywidHlwZSI6InJlZnJlc2gifQ.qfQpIUOYyJR6Y9DzdmoOTQ6W4EVQCs77sevH7oH-gUo','2026-11-21 11:11:47',0,'2026-11-14 16:41:47'),(26,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2IiwianRpIjoiYjNlZDQ4NWY1NTY3NGE4MDhmMmUyMWViMjliOWE5ODUiLCJleHAiOjE3OTUyNTk1MDgsImlhdCI6MTc5NDY1NDcwOCwidHlwZSI6InJlZnJlc2gifQ.RrSFgtSneaErQZkSi3s52UCzltfczGxneEazWQO-y9U','2026-11-21 11:11:48',0,'2026-11-14 16:41:48'),(27,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiY2FiMzUxOTkxNzkzNDAxODkxYWRiZWUxZjZhMWMwNzMiLCJleHAiOjE3OTUyNTk1MTAsImlhdCI6MTc5NDY1NDcxMCwidHlwZSI6InJlZnJlc2gifQ.rrb7iGSjckTQt-edRhU1SKDDPVMBK-4Yr0PN2f65pr0','2026-11-21 11:11:50',0,'2026-11-14 16:41:50'),(28,7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwianRpIjoiMGU4MWZlOTZmMTU5NGY5ZDkwZTRjZmI3MzAxM2E3NDAiLCJleHAiOjE3OTUyNTk1MTEsImlhdCI6MTc5NDY1NDcxMSwidHlwZSI6InJlZnJlc2gifQ.GFL3dPezuOIW7b1vL3mrq55ttvEonH_7RD-xy70yQWg','2026-11-21 11:11:51',0,'2026-11-14 16:41:51'),(29,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZTIzMTZhNzQ5ZTNiNGZlOWFmMTYxNTkxMjlmOTZhOWQiLCJleHAiOjE3OTUyNTk4NzMsImlhdCI6MTc5NDY1NTA3MywidHlwZSI6InJlZnJlc2gifQ.HE2ZliMhKhnZKjxpPIWcFYF4nOmSaeumMBSNDwPELK8','2026-11-21 11:17:54',1,'2026-11-14 16:47:53'),(30,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwianRpIjoiMmExNDNiZGQxOWEyNDhlN2EyZDkzZThkMTFkZDEwZGEiLCJleHAiOjE3OTUyNTk5MzMsImlhdCI6MTc5NDY1NTEzMywidHlwZSI6InJlZnJlc2gifQ.l36NyMGIMUIHDrq_Z94Q5rERSuALTp7nKYnCOkGAq0k','2026-11-21 11:18:54',1,'2026-11-14 16:48:53'),(31,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiODZiMGUyYjBhYThmNDYyNWEzZWYxYTM4ZjMzMTlmMWYiLCJleHAiOjE3OTUyNjExNjQsImlhdCI6MTc5NDY1NjM2NCwidHlwZSI6InJlZnJlc2gifQ.dWdGJSyubEL0cpVvc-KUyA4RUypebc6oJOfYciPDz10','2026-11-21 11:39:25',0,'2026-11-14 17:09:24'),(32,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4IiwianRpIjoiMTQ4OGQ3ODcxNTUyNDFjM2I1ZDMzNzdmYTgwMWE4ODAiLCJleHAiOjE3OTUyNjExNjUsImlhdCI6MTc5NDY1NjM2NSwidHlwZSI6InJlZnJlc2gifQ.BUPTHBAW2pckIXxOWz0r7anNzarTMumG28dntA2bqFY','2026-11-21 11:39:26',0,'2026-11-14 17:09:25'),(33,9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5IiwianRpIjoiNTRjZGVlMDBkMzE5NDY4Njg2OWIzMTQ5NDdmOWM5ZmQiLCJleHAiOjE3OTUyNjExNjcsImlhdCI6MTc5NDY1NjM2NywidHlwZSI6InJlZnJlc2gifQ.622tPhZsaj6kWzVfJKVjsrncsLD09YorLCRrROXppyM','2026-11-21 11:39:27',0,'2026-11-14 17:09:27'),(34,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMCIsImp0aSI6Ijg2MDE1MzY2M2JhYjQ2MWI5MDgwMDIwZWRhNWE5ZmQ2IiwiZXhwIjoxNzk1MjYxMTY3LCJpYXQiOjE3OTQ2NTYzNjcsInR5cGUiOiJyZWZyZXNoIn0.XFCkc8PVEqZujENMg_4X7m2NdIgPIvA4-0k5X_28Clo','2026-11-21 11:39:28',0,'2026-11-14 17:09:27'),(35,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMCIsImp0aSI6ImE4Yjk0NDIzNGJhMzQ3ODBhYmU5MGRjMzIzYWYyZGVlIiwiZXhwIjoxNzk1MjYxMTY4LCJpYXQiOjE3OTQ2NTYzNjgsInR5cGUiOiJyZWZyZXNoIn0.VowE1m_pCcRTWBrvWRVdfZs1xDQcw-sRzCJbxxx0NGs','2026-11-21 11:39:28',0,'2026-11-14 17:09:28'),(36,9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5IiwianRpIjoiODBjYTlhN2I3M2E1NDQ1NGJlNThjYmJlYzQ2OGY0MTAiLCJleHAiOjE3OTUyNjExNjksImlhdCI6MTc5NDY1NjM2OSwidHlwZSI6InJlZnJlc2gifQ.4_C7huRgmbqHSk3kK7KtvMXdvMSyDkw8xAVQdHSvLRw','2026-11-21 11:39:29',0,'2026-11-14 17:09:29'),(37,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiMmM1Y2EzNWNkZWI0NDM1ZWEyM2VlYmI0MWYwMzE3ZDgiLCJleHAiOjE3OTUyNjEyMDUsImlhdCI6MTc5NDY1NjQwNSwidHlwZSI6InJlZnJlc2gifQ.j3sTqbIhPLcD47IkFmfmo7xTygOi048xO5Hzm7DNd_4','2026-11-21 11:40:05',0,'2026-11-14 17:10:05'),(38,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4IiwianRpIjoiMDk1YzIyYjZhZDk3NGEyNzhmYTQzYzJmOThkNDQxOWMiLCJleHAiOjE3OTUyNjEyMDUsImlhdCI6MTc5NDY1NjQwNSwidHlwZSI6InJlZnJlc2gifQ.W62AsHwXZ9cJ2PLUUcH9G6MOSEQ0i9oAKkrSwUCWEXw','2026-11-21 11:40:06',0,'2026-11-14 17:10:05'),(39,9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5IiwianRpIjoiMjBkYjkwNTVjM2U2NGUyNjhkYzQyMWU3ZjdhNjIzYWUiLCJleHAiOjE3OTUyNjEyMDYsImlhdCI6MTc5NDY1NjQwNiwidHlwZSI6InJlZnJlc2gifQ.wMCYu7tiEsmrNFYmzTs5qNuDzr9gFpflw6Q4ehKJbtM','2026-11-21 11:40:07',0,'2026-11-14 17:10:06'),(40,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMCIsImp0aSI6ImNkZDZkZjYzNjM3YzQyOWNhMGY4MjQ0YjViNTNiZjg4IiwiZXhwIjoxNzk1MjYxMjA3LCJpYXQiOjE3OTQ2NTY0MDcsInR5cGUiOiJyZWZyZXNoIn0.-7Gz0XWyD8MFsGnuVfZSe3RkPoYqwD95B0FBe8ae1Bk','2026-11-21 11:40:07',0,'2026-11-14 17:10:07'),(41,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMCIsImp0aSI6ImYyODMxZDk0NmFkMjRjNTE5Y2FmODEzNmIyYjUzNWRkIiwiZXhwIjoxNzk1MjYxMjA3LCJpYXQiOjE3OTQ2NTY0MDcsInR5cGUiOiJyZWZyZXNoIn0.dE_guxu3F5gDpL7qFrs4OjMsJgupsou0HwCdCJlgehg','2026-11-21 11:40:08',0,'2026-11-14 17:10:07'),(42,9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5IiwianRpIjoiYmE5MzY4ZDNjMDBhNDk2MjkyMTcwNGIzYzNlYzhjOGQiLCJleHAiOjE3OTUyNjEyMDgsImlhdCI6MTc5NDY1NjQwOCwidHlwZSI6InJlZnJlc2gifQ.Jugtw4u96ztw63enDxbBHKMVlwvnuXdc9tRwwpk63Xs','2026-11-21 11:40:08',0,'2026-11-14 17:10:08'),(43,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiYTgwODQzZTU3NTA2NDc4N2IwMWMwNWFiYmIxZmMwNWMiLCJleHAiOjE3OTUyNjEyMzAsImlhdCI6MTc5NDY1NjQzMCwidHlwZSI6InJlZnJlc2gifQ.HJmAY6ROqLJ3e8bC6mkqqaWTzM4JOZkpY-MMfRE_uPg','2026-11-21 11:40:31',0,'2026-11-14 17:10:30'),(44,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiMjY3NjA3YThmYjhlNDhlNjkzMzIzOWM1YjNiMjIxYmEiLCJleHAiOjE3OTUyNjEyMzIsImlhdCI6MTc5NDY1NjQzMiwidHlwZSI6InJlZnJlc2gifQ.lUrjWO7m9Pl1_4WzCih2XyuLhpyXlv-QG1v8DR8iZkk','2026-11-21 11:40:33',0,'2026-11-14 17:10:32'),(45,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiY2FhZmQ0Yjk3Zjk5NGZkMWFkY2VjOTYwNjY2NThlNWUiLCJleHAiOjE3OTUyNjEyMzQsImlhdCI6MTc5NDY1NjQzNCwidHlwZSI6InJlZnJlc2gifQ.VVVpSmExlyyJz4RvmJFoZRCfTFg03CTPowH-gKvN8bI','2026-11-21 11:40:35',1,'2026-11-14 17:10:34'),(46,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiMGEzMzIyZGY5NDVhNDdmYWJiMjc2Mzc0M2QxYmI0NDIiLCJleHAiOjE3OTUyNjEyMzQsImlhdCI6MTc5NDY1NjQzNCwidHlwZSI6InJlZnJlc2gifQ.ScPPUzcbZMB_VantRYzXd-IbXxMjnv8ssFMzNsTW_64','2026-11-21 11:40:35',0,'2026-11-14 17:10:34'),(47,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiMjYzNDIxMGE1Mjg1NDM4Mzg0NjQ1YzFhZDg3Nzc2NzEiLCJleHAiOjE3OTUyNjEyMzcsImlhdCI6MTc5NDY1NjQzNywidHlwZSI6InJlZnJlc2gifQ.Qvtq3C26rUllC_5Vb8WUyloGnwBEtSnWwMJbSlR_Yno','2026-11-21 11:40:37',0,'2026-11-14 17:10:37'),(48,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiYzc5OGJjYWI0NjIwNGZhMzg0ZTkzZDc3NmFkZDQ0ZTgiLCJleHAiOjE3OTUyNjEyMzgsImlhdCI6MTc5NDY1NjQzOCwidHlwZSI6InJlZnJlc2gifQ.WileRgUvUfNWDaB-IoTNt8BD-QJjgOrCbtZFHgxz1xQ','2026-11-21 11:40:39',0,'2026-11-14 17:10:38'),(49,11,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMSIsImp0aSI6IjgwMGE5YzhkMjM5NTRmZDhiMjE0MWViZmJkMTI2N2UwIiwiZXhwIjoxNzk1MjYxMjM5LCJpYXQiOjE3OTQ2NTY0MzksInR5cGUiOiJyZWZyZXNoIn0.YCt-ikciuix_P4ck-djqQPepmtoYu7QCBaohkbgquqs','2026-11-21 11:40:40',0,'2026-11-14 17:10:39'),(50,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiMjBjMTkyYTc1M2NlNDIwODlkYTJlN2Q2Yzg5ZWQ5YjUiLCJleHAiOjE3OTUyNjEyNDEsImlhdCI6MTc5NDY1NjQ0MSwidHlwZSI6InJlZnJlc2gifQ.JsRngzKkuyViJjg_2ow_EIs85VnuwOcZyEzblhC3OJE','2026-11-21 11:40:41',0,'2026-11-14 17:10:41'),(51,12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMiIsImp0aSI6IjAwNmU2OWY0ODQwODRlYWU5ZGJhZWFmZmM3ZDRiMGE0IiwiZXhwIjoxNzk1MjYxMjQxLCJpYXQiOjE3OTQ2NTY0NDEsInR5cGUiOiJyZWZyZXNoIn0.CKjM4qRvLKAd3btr7bWwdNBflEEk3_xSdakRwVFN3pU','2026-11-21 11:40:42',0,'2026-11-14 17:10:41'),(52,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZmNkOGY1ODM1MmIyNGVmNWExN2E4NWIzODU1YWNkODYiLCJleHAiOjE3OTUyNjEyNDIsImlhdCI6MTc5NDY1NjQ0MiwidHlwZSI6InJlZnJlc2gifQ.TOYvIFJ3bZdGjS-A1cYszeEeXcq9UFPSy1GDrZ_UT2o','2026-11-21 11:40:43',0,'2026-11-14 17:10:42'),(53,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4IiwianRpIjoiZDA4NTI5MWNhMmIyNGE4YWFiNzVjODkwMjFmZDIyYWEiLCJleHAiOjE3OTUyNjEyNDMsImlhdCI6MTc5NDY1NjQ0MywidHlwZSI6InJlZnJlc2gifQ.oX9J_eMYenx7I8Es59gEp-XkL-vMkOvOJWiQDSz7oEU','2026-11-21 11:40:43',0,'2026-11-14 17:10:43'),(54,9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5IiwianRpIjoiNGM2Y2RhZTM1OTZlNDU5ZTg5NmNjMWYwMzNmMDZjYWEiLCJleHAiOjE3OTUyNjEyNDMsImlhdCI6MTc5NDY1NjQ0MywidHlwZSI6InJlZnJlc2gifQ.rKFBqKkJa6vh86gEmMLHcShbbmSR6un1K7HDNGo6t3Y','2026-11-21 11:40:44',0,'2026-11-14 17:10:43'),(55,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMCIsImp0aSI6ImEwZDljZGU5MmY1MTRjMTBiNThhOGE0ZTRkN2Q4M2JiIiwiZXhwIjoxNzk1MjYxMjQ0LCJpYXQiOjE3OTQ2NTY0NDQsInR5cGUiOiJyZWZyZXNoIn0.uwLVmSG3NGhyxnBJ_6TsqL_3R-IdNrEEvgM714Xpmts','2026-11-21 11:40:44',0,'2026-11-14 17:10:44'),(56,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMCIsImp0aSI6ImQwMDgzNjI3NmE3ZTRjNjBhZDY0NDdhODZkMjQyYmI3IiwiZXhwIjoxNzk1MjYxMjQ0LCJpYXQiOjE3OTQ2NTY0NDQsInR5cGUiOiJyZWZyZXNoIn0.d_-WRGIDPBq6lIYBtIbKS5NcMUrorC_Q8h9Bmpws8V8','2026-11-21 11:40:45',0,'2026-11-14 17:10:44'),(57,9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5IiwianRpIjoiZDRjOWEzZDI1MjFmNDAzYTlkZGNlNzc2MzIzOWU3YzAiLCJleHAiOjE3OTUyNjEyNDUsImlhdCI6MTc5NDY1NjQ0NSwidHlwZSI6InJlZnJlc2gifQ.BnmuAYw1IndEYoF3sJ74U5Frt4WoRS39CJLQvKplucY','2026-11-21 11:40:45',0,'2026-11-14 17:10:45'),(58,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZjIxNmY4ODAwNjJhNDk0Zjg1OTdmNTZjMDE5ZDQwNjciLCJleHAiOjE3OTUyNjE1MjQsImlhdCI6MTc5NDY1NjcyNCwidHlwZSI6InJlZnJlc2gifQ.H47pfaqo1-mqBawWIiT_sqmvnDrR8Jm1KOAHAHQS6ic','2026-11-21 11:45:25',1,'2026-11-14 17:15:24'),(59,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiNWM2ZDEzY2JiNjhhNDQ1Mzk2OGMyMGZmNzUzMzI1NzYiLCJleHAiOjE3OTUyNjE2NTcsImlhdCI6MTc5NDY1Njg1NywidHlwZSI6InJlZnJlc2gifQ.9n1DQYpXPuMG8rULkGo_vUGv1pW7UQRtWmIDbWY_lhY','2026-11-21 11:47:38',0,'2026-11-14 17:17:37'),(60,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZjc4YWEwNTMyODA1NDU1Yjk5Y2E3MTQzMzBjNGFlZTIiLCJleHAiOjE3OTUyNjE2NTcsImlhdCI6MTc5NDY1Njg1NywidHlwZSI6InJlZnJlc2gifQ.nIjdQTUZksnZ1ooCR9mOUpyKMaWPB3witzhBATOzv0g','2026-11-21 11:47:38',0,'2026-11-14 17:17:37'),(61,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiNGZmZDM4MDk0OWFjNDJjYzlmYmVlZDBhZTgyMzhhNmYiLCJleHAiOjE3OTUyNjE2NTgsImlhdCI6MTc5NDY1Njg1OCwidHlwZSI6InJlZnJlc2gifQ.-OLLlq8-U9DdB1ZNfEDgFO7Vc6AgvLOJhBA09O9GK5U','2026-11-21 11:47:38',1,'2026-11-14 17:17:38'),(62,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiNWMyZmViYTM4YzhiNDNiZmFlZmVkZDg4OTcwZWI1N2UiLCJleHAiOjE3OTUyNjE2NTgsImlhdCI6MTc5NDY1Njg1OCwidHlwZSI6InJlZnJlc2gifQ.SqShV7_3KeQwbAbEqi9HkDVrOHDg1HrkWl18yA-GXNs','2026-11-21 11:47:38',0,'2026-11-14 17:17:38'),(63,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZjY2ODBjNmYxMjg3NGRiYmE3ODEwZTVmMzc0MzJjYjciLCJleHAiOjE3OTUyNjE2NTgsImlhdCI6MTc5NDY1Njg1OCwidHlwZSI6InJlZnJlc2gifQ.XaPTvaea8dJT1oJ_SKviDkxv6mQsKQEW-WIsxfdkSeM','2026-11-21 11:47:39',0,'2026-11-14 17:17:38'),(64,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiNGZiOTQ2MzUyM2Q4NDliZmE4MTU5NmJmM2EyOWI5ZmQiLCJleHAiOjE3OTUyNjE2NTksImlhdCI6MTc5NDY1Njg1OSwidHlwZSI6InJlZnJlc2gifQ.2tbCyP9TWoKxjgaZCoSAu_LTawYmc_7GYcgAg2Q2bXw','2026-11-21 11:47:40',0,'2026-11-14 17:17:39'),(65,13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMyIsImp0aSI6IjM3MzlkMTIwOTQ3MDRjZmY4MjUyNzc3MGU5ZWFjNDNjIiwiZXhwIjoxNzk1MjYxNjYwLCJpYXQiOjE3OTQ2NTY4NjAsInR5cGUiOiJyZWZyZXNoIn0.uQNMmrZRHHeTP0dUS1q7Abiludac63L9DCfWCozncio','2026-11-21 11:47:40',0,'2026-11-14 17:17:40'),(66,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiNGQyM2VlYjQzM2ZkNGYxODhjZjJjNDVhOTZlM2JmZDAiLCJleHAiOjE3OTUyNjE2NjAsImlhdCI6MTc5NDY1Njg2MCwidHlwZSI6InJlZnJlc2gifQ.iIZts4njmMPbP7bxhZNNtKxQaUH6DJU7FB5-DXIAVt8','2026-11-21 11:47:41',0,'2026-11-14 17:17:40'),(67,14,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNCIsImp0aSI6ImNlZTE5ZjQxMDc5ZTQ4MzJhYzM2YzYwODc2YzQ2NzE1IiwiZXhwIjoxNzk1MjYxNjYxLCJpYXQiOjE3OTQ2NTY4NjEsInR5cGUiOiJyZWZyZXNoIn0.xRsrh89lElfFlZ2COMV-ij9RDYV-lecaOCxSfaDKo-w','2026-11-21 11:47:41',0,'2026-11-14 17:17:41'),(68,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiNjRhZGM5NmI4NzM2NGMzMDhlZDViZWFjMGZkY2Y5ZTMiLCJleHAiOjE3OTUyNjE2NjEsImlhdCI6MTc5NDY1Njg2MSwidHlwZSI6InJlZnJlc2gifQ.-xZJ1nszHm_EK7YQYw2ss7IQK89uujWd5ygkPH_Okxg','2026-11-21 11:47:42',0,'2026-11-14 17:17:41'),(69,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4IiwianRpIjoiMTVkY2FlMGNlN2EzNGU4Mjg1YTM5MmI3ODY5ZmU0NTAiLCJleHAiOjE3OTUyNjE2NjIsImlhdCI6MTc5NDY1Njg2MiwidHlwZSI6InJlZnJlc2gifQ.a6d3AuGxI2L1TfwdfITxWeMGlJXUKDeVjB3Agl37S2k','2026-11-21 11:47:42',0,'2026-11-14 17:17:42'),(70,9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5IiwianRpIjoiZDU2ODk0MDViODIzNGMzMmI5ZDJmNzFmNzVkMTYzMDEiLCJleHAiOjE3OTUyNjE2NjMsImlhdCI6MTc5NDY1Njg2MywidHlwZSI6InJlZnJlc2gifQ.RM94RaQtpaqLyehAz4-LWA7iOoooDKc_zf5UnsFaE4I','2026-11-21 11:47:43',0,'2026-11-14 17:17:43'),(71,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMCIsImp0aSI6ImI0MTViODcyYjZiZjQxNjlhYzMwMGRiMWJjMWM2YzNiIiwiZXhwIjoxNzk1MjYxNjYzLCJpYXQiOjE3OTQ2NTY4NjMsInR5cGUiOiJyZWZyZXNoIn0.iC21Y8rNPebVCqVV_hIevmTyvXFCEKkSCBKttzEiIK4','2026-11-21 11:47:44',0,'2026-11-14 17:17:43'),(72,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMCIsImp0aSI6ImMzOGJhODQzYWE4ZTQzNzdhOGQxMTMwNzE1ODVhYzQ4IiwiZXhwIjoxNzk1MjYxNjY0LCJpYXQiOjE3OTQ2NTY4NjQsInR5cGUiOiJyZWZyZXNoIn0.0whJ7zfRQxI6YmHyQIaTLTyotyGN1J4DQRzvIsT0cxY','2026-11-21 11:47:44',0,'2026-11-14 17:17:44'),(73,9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5IiwianRpIjoiOWExYzFiZmYwZWIzNGQyNmE1Njg0YTVhNTE2NDZmNTQiLCJleHAiOjE3OTUyNjE2NjQsImlhdCI6MTc5NDY1Njg2NCwidHlwZSI6InJlZnJlc2gifQ.xT3SAS-qu9b4DjBXQyqHI1lYf_-2CVzK60Z8SK4MPwc','2026-11-21 11:47:44',0,'2026-11-14 17:17:44'),(74,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiOWVhNGQzZDgwYzIzNDVjMThiMzk4Y2E5NzdiNDY4NzAiLCJleHAiOjE3OTUyNjE3OTYsImlhdCI6MTc5NDY1Njk5NiwidHlwZSI6InJlZnJlc2gifQ.YkNLnrPaEICwrGrexwW-YusaslhlRZM37YIhI6wxX64','2026-11-21 11:49:57',0,'2026-11-14 17:19:56'),(75,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiODdjYzkwMjVhNmIyNGVkNmIwY2VkMGIwMzM3OWVmMmMiLCJleHAiOjE3OTUyNjE5MDEsImlhdCI6MTc5NDY1NzEwMSwidHlwZSI6InJlZnJlc2gifQ.sBv4k6XydXVRSVf6qrziD535U8w5FbEed7cX3dkHWwc','2026-11-21 11:51:42',0,'2026-11-14 17:21:41'),(76,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiM2RjNjc2NTVmMDgyNGEyODhmYzQxNTgyZmQxN2ZjODAiLCJleHAiOjE3OTUyNjE5OTAsImlhdCI6MTc5NDY1NzE5MCwidHlwZSI6InJlZnJlc2gifQ.cvOG44oTsiX-E5EGaI4c-L9AszRhZLaoNmhFi6N0mXU','2026-11-21 11:53:11',0,'2026-11-14 17:23:10');
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_role_permission` (`role_id`,`permission_id`),
  KEY `ix_role_permissions_permission_id` (`permission_id`),
  KEY `ix_role_permissions_role_id` (`role_id`),
  CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_system_role` tinyint(1) NOT NULL,
  `organization_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_role_name_org` (`name`,`organization_id`),
  KEY `ix_roles_organization_id` (`organization_id`),
  KEY `ix_roles_slug` (`slug`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ORGANIZATION_ADMIN','organization-admin','Full administrative authority within the organization tenant',1,NULL,'2026-11-14 16:01:53','2026-11-14 16:01:53'),(2,'HR','hr','Human Resources officer with authority over payroll, employees, attendance and leave',1,NULL,'2026-11-14 16:01:53','2026-11-14 16:01:53'),(3,'MANAGER','manager','Team lead / Department head who reviews leaves and team attendance',1,NULL,'2026-11-14 16:01:53','2026-11-14 16:01:53'),(4,'EMPLOYEE','employee','Standard employee / faculty member with self-service capabilities',1,NULL,'2026-11-14 16:01:53','2026-11-14 16:01:53');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary_components`
--

DROP TABLE IF EXISTS `salary_components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salary_components` (
  `id` int NOT NULL AUTO_INCREMENT,
  `salary_structure_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `component_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `calculation_type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `percentage_value` decimal(6,2) NOT NULL,
  `default_amount` decimal(12,2) NOT NULL,
  `is_taxable` tinyint(1) NOT NULL,
  `is_statutory` tinyint(1) NOT NULL,
  `display_order` int NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_salary_components_organization_id` (`organization_id`),
  KEY `ix_salary_components_salary_structure_id` (`salary_structure_id`),
  CONSTRAINT `salary_components_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `salary_components_ibfk_2` FOREIGN KEY (`salary_structure_id`) REFERENCES `salary_structures` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary_components`
--

LOCK TABLES `salary_components` WRITE;
/*!40000 ALTER TABLE `salary_components` DISABLE KEYS */;
/*!40000 ALTER TABLE `salary_components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary_structures`
--

DROP TABLE IF EXISTS `salary_structures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salary_structures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_salary_structure_code_org` (`code`,`organization_id`),
  KEY `ix_salary_structures_is_deleted` (`is_deleted`),
  KEY `ix_salary_structures_organization_id` (`organization_id`),
  CONSTRAINT `salary_structures_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary_structures`
--

LOCK TABLES `salary_structures` WRITE;
/*!40000 ALTER TABLE `salary_structures` DISABLE KEYS */;
/*!40000 ALTER TABLE `salary_structures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shifts`
--

DROP TABLE IF EXISTS `shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shifts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `grace_period_minutes` int NOT NULL,
  `half_day_hours` int NOT NULL,
  `full_day_hours` int NOT NULL,
  `is_night_shift` tinyint(1) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_shift_code_org` (`code`,`organization_id`),
  KEY `ix_shifts_is_deleted` (`is_deleted`),
  KEY `ix_shifts_organization_id` (`organization_id`),
  CONSTRAINT `shifts_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shifts`
--

LOCK TABLES `shifts` WRITE;
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
INSERT INTO `shifts` VALUES (3,'General Standard Shift','GEN','09:00:00','18:00:00',15,4,8,0,1,1,'2026-11-14 17:07:36','2026-11-14 17:07:36',1,0,NULL);
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_invitations`
--

DROP TABLE IF EXISTS `user_invitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_invitations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` int NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_accepted` tinyint(1) NOT NULL,
  `invited_by_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_invitation_email_org` (`email`,`organization_id`),
  UNIQUE KEY `ix_user_invitations_token` (`token`),
  KEY `invited_by_id` (`invited_by_id`),
  KEY `role_id` (`role_id`),
  KEY `ix_user_invitations_email` (`email`),
  KEY `ix_user_invitations_is_accepted` (`is_accepted`),
  KEY `ix_user_invitations_organization_id` (`organization_id`),
  CONSTRAINT `user_invitations_ibfk_1` FOREIGN KEY (`invited_by_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `user_invitations_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_invitations_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_invitations`
--

LOCK TABLES `user_invitations` WRITE;
/*!40000 ALTER TABLE `user_invitations` DISABLE KEYS */;
INSERT INTO `user_invitations` VALUES (1,'newhire@apexcorp.io',4,'xWVOzbFNGrjmSz8ektrVbU_cmf4lN8old8Nj6NekTQs','2026-11-21 11:09:30',1,1,'2026-11-14 16:39:30','2026-11-14 16:39:30',1),(2,'newhire_b91490@apexcorp.io',4,'lMxVUdFtEso5LWaVyEM8bKnkRdXfRyODzDUyfesfPuM','2026-11-21 11:11:14',1,1,'2026-11-14 16:41:13','2026-11-14 16:41:14',1),(3,'emp_guard_ade47a@apexcorp.io',4,'QIv-7t09Ua6rg1zfJ470aa6FL7KaZDOCzdOCS4B3eQY','2026-11-21 11:11:17',1,1,'2026-11-14 16:41:17','2026-11-14 16:41:17',1),(4,'newhire_edac5a@apexcorp.io',4,'c327HUaqe7aEJ7dPGLqCDYDfWWEfJTIH7Mx6OWo6OOc','2026-11-21 11:11:47',1,1,'2026-11-14 16:41:47','2026-11-14 16:41:47',1),(5,'emp_guard_4b47f2@apexcorp.io',4,'7E3538NkE2RQcoEdVklt8HpMSidTbc3qam-kSw92ysQ','2026-11-21 11:11:50',1,1,'2026-11-14 16:41:50','2026-11-14 16:41:50',1),(6,'newhire_026a1b@apexcorp.io',4,'MzgrO7OwT83y2wrI5Pg7fwdhU6BtEwnwzsXJ7bhOOHU','2026-11-21 11:40:39',1,1,'2026-11-14 17:10:38','2026-11-14 17:10:39',1),(7,'emp_guard_db9f5f@apexcorp.io',4,'LPLPnE1dyvlVv1ubzkqJrDp3FfYzbXY85wXhp-g4xKc','2026-11-21 11:40:41',1,1,'2026-11-14 17:10:41','2026-11-14 17:10:41',1),(8,'newhire_2f49e3@apexcorp.io',4,'JwMN0-27s7BRb7K2d7nhGENBKbcaPgcjk4s9z0gmoyM','2026-11-21 11:47:40',1,1,'2026-11-14 17:17:39','2026-11-14 17:17:40',1),(9,'emp_guard_91df31@apexcorp.io',4,'YhYMQ08p0jPgMgwEDdqjGiRg95QZHHGWsGLoiw2NDaQ','2026-11-21 11:47:41',1,1,'2026-11-14 17:17:40','2026-11-14 17:17:41',1);
/*!40000 ALTER TABLE `user_invitations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organization_id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashed_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  `is_deleted` tinyint(1) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_user_email_org` (`email`,`organization_id`),
  KEY `role_id` (`role_id`),
  KEY `ix_users_email` (`email`),
  KEY `ix_users_is_deleted` (`is_deleted`),
  KEY `ix_users_organization_id` (`organization_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'admin@apexcorp.io','$2b$12$ftYUmqTGKpbuyWNIjmOItu9aDhG9KpzfNurQB/eeTnXa//lgehSxW','Arthur','Pendleton',NULL,NULL,1,1,0,'2026-11-14 11:53:11',1,'2026-11-14 16:01:53','2026-11-14 17:23:10',0,NULL),(2,2,'dean@stjohns.edu','$2b$12$uJNyBk98.aCHQynKLHAfYOBZk1T1Lv7BMmes11/RYRf9HpEb1AWSS','Eleanor','Vance',NULL,NULL,1,1,0,'2026-11-14 11:18:54',1,'2026-11-14 16:01:53','2026-11-14 16:48:53',0,NULL),(3,1,'newhire@apexcorp.io','$2b$12$v1N51RCKaxoEiZP.OdzQ/uxWFVRlHyxRqslWcZVYA33HtaeOHG8iq','Marcus','Vance',NULL,NULL,1,1,0,'2026-11-14 11:09:55',4,'2026-11-14 16:39:30','2026-11-14 16:39:54',0,NULL),(4,1,'newhire_b91490@apexcorp.io','$2b$12$DHB8uWyoJqBnYyzVpgpKTu1DcQowrNxVrPavxOM87.etz3LWf.wNW','Marcus','Vance',NULL,NULL,1,1,0,'2026-11-14 11:11:15',4,'2026-11-14 16:41:14','2026-11-14 16:41:15',0,NULL),(5,1,'emp_guard_ade47a@apexcorp.io','$2b$12$EhGi/wD.gX4O50OrzjBRMuLOKeHdBkPXBuSenSiqUBuGQtL0fgn/y','Employee','Guard',NULL,NULL,1,1,0,'2026-11-14 11:11:18',4,'2026-11-14 16:41:17','2026-11-14 16:41:18',0,NULL),(6,1,'newhire_edac5a@apexcorp.io','$2b$12$thLSF1.FSCEETR/fzie2GeRaAPfJMvQLzUtXOeLMs/Poq7ShtEuHy','Marcus','Vance',NULL,NULL,1,1,0,'2026-11-14 11:11:48',4,'2026-11-14 16:41:47','2026-11-14 16:41:48',0,NULL),(7,1,'emp_guard_4b47f2@apexcorp.io','$2b$12$cygFqe8SPJOgPOGFIKcsDeJ3t19Q/SA06y5PaiwIXfO5D80ybLFhi','Employee','Guard',NULL,NULL,1,1,0,'2026-11-14 11:11:51',4,'2026-11-14 16:41:50','2026-11-14 16:41:51',0,NULL),(8,1,'hr@apexcorp.io','$2b$12$vqp.w9moI0dZzY0bDtSWD.ZXnhN7hF9W7i7LkErP3ptZGE.J.nXYm','Claire','Higgins',NULL,NULL,1,1,0,'2026-11-14 11:47:42',2,'2026-11-14 17:05:41','2026-11-14 17:17:42',0,NULL),(9,1,'manager@apexcorp.io','$2b$12$DRJgdd83tbhpRYAE5niMxeVQXDKqcwEl14pPUgxsh2m4sxRh3qxvO','Marcus','Vance',NULL,NULL,1,1,0,'2026-11-14 11:47:44',3,'2026-11-14 17:05:41','2026-11-14 17:17:44',0,NULL),(10,1,'employee@apexcorp.io','$2b$12$WvirEUrYA8wff958qbkBx.5ICqTuVSszmXgjvlGAzopVCXZjxGq5e','Sarah','Jenkins',NULL,NULL,1,1,0,'2026-11-14 11:47:44',4,'2026-11-14 17:05:42','2026-11-14 17:17:44',0,NULL),(11,1,'newhire_026a1b@apexcorp.io','$2b$12$h2vvxgJvynE1SDAndQFFnen8/wPUpT9l0LsTFNoD9sJGunxZB1KpG','Marcus','Vance',NULL,NULL,1,1,0,'2026-11-14 11:40:40',4,'2026-11-14 17:10:39','2026-11-14 17:10:39',0,NULL),(12,1,'emp_guard_db9f5f@apexcorp.io','$2b$12$DVEsI2aymy6lSQ6nd9DedekYC6xL6yQlUtN8o/OhQnfOCf.qy2MA.','Employee','Guard',NULL,NULL,1,1,0,'2026-11-14 11:40:42',4,'2026-11-14 17:10:41','2026-11-14 17:10:41',0,NULL),(13,1,'newhire_2f49e3@apexcorp.io','$2b$12$2OQ.TNsz3swv/luNfiZC1eEIjAG2VmD.MS8cHIQ1CnkKF4k6UrffG','Marcus','Vance',NULL,NULL,1,1,0,'2026-11-14 11:47:40',4,'2026-11-14 17:17:40','2026-11-14 17:17:40',0,NULL),(14,1,'emp_guard_91df31@apexcorp.io','$2b$12$qyRVzxqG/6lMKOdmvCD7xuX/vo2c2mCn6dfRUo7QBVp6Lc6RmEFSe','Employee','Guard',NULL,NULL,1,1,0,'2026-11-14 11:47:41',4,'2026-11-14 17:17:41','2026-11-14 17:17:41',0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-14 17:48:27
