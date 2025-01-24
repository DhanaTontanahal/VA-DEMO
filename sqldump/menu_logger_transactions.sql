-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: menu_logger
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `transaction_type` varchar(50) NOT NULL,
  `transaction_amount` decimal(10,2) NOT NULL,
  `transaction_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,1,'Shopping',120.50,'2023-01-15 10:45:30'),(2,1,'Pay Bill',85.20,'2023-02-12 14:30:45'),(3,1,'Refund',45.00,'2023-03-20 11:15:25'),(4,1,'Subscription',30.75,'2023-03-10 16:40:00'),(5,1,'Transfer',175.99,'2023-04-01 12:25:35'),(6,1,'Investment',250.00,'2023-05-10 11:20:15'),(7,2,'Loan Payment',135.45,'2023-06-20 10:10:40'),(8,2,'Shopping',190.00,'2023-07-01 09:35:25'),(9,2,'Transfer',80.20,'2023-08-15 14:50:30'),(10,2,'Pay Bill',50.75,'2023-09-10 17:45:00'),(11,1,'Shopping',140.30,'2024-01-10 12:20:30'),(12,1,'Pay Bill',100.50,'2024-02-12 16:15:00'),(13,1,'Refund',50.00,'2024-03-10 10:00:00'),(14,2,'Subscription',29.99,'2024-04-15 09:45:20'),(15,2,'Transfer',300.00,'2024-05-18 18:10:10'),(16,2,'Shopping',200.75,'2024-06-22 15:30:30'),(17,1,'Loan Payment',150.45,'2024-07-25 10:15:45'),(18,2,'Investment',500.00,'2024-08-10 13:10:50'),(19,1,'Pay Bill',90.60,'2024-09-12 11:20:30'),(20,1,'Shopping',275.00,'2024-10-15 14:40:00'),(21,2,'Shopping',210.80,'2025-01-20 13:15:25'),(22,1,'Subscription',45.99,'2025-02-15 10:30:50'),(23,1,'Transfer',600.00,'2025-03-12 12:25:30'),(24,2,'Investment',800.00,'2025-04-20 17:10:40'),(25,1,'Refund',75.20,'2025-05-15 09:50:15'),(26,2,'Loan Payment',350.75,'2025-06-25 08:45:20'),(27,1,'Shopping',300.00,'2025-07-10 11:15:10'),(28,2,'Pay Bill',120.40,'2025-08-12 14:50:30'),(29,1,'Investment',400.00,'2025-09-18 16:20:50'),(30,2,'Subscription',60.00,'2025-10-22 18:10:40'),(31,101101,'Shopping',120.50,'2023-01-15 10:45:30'),(32,101101,'Pay Bill',85.20,'2023-02-12 14:30:45'),(33,101101,'Refund',45.00,'2023-03-20 11:15:25'),(34,101101,'Subscription',30.75,'2023-03-10 16:40:00'),(35,101101,'Transfer',175.99,'2023-04-01 12:25:35'),(36,101101,'Investment',250.00,'2023-05-10 11:20:15'),(37,101101,'Loan Payment',135.45,'2023-06-20 10:10:40'),(38,101101,'Shopping',190.00,'2023-07-01 09:35:25'),(39,101101,'Transfer',80.20,'2023-08-15 14:50:30'),(40,101101,'Pay Bill',50.75,'2023-09-10 17:45:00'),(41,101101,'Refund',100.00,'2023-10-05 13:25:40'),(42,101101,'Shopping',150.00,'2024-01-12 10:25:00'),(43,101101,'Pay Bill',75.00,'2024-02-08 14:40:00'),(44,101101,'Transfer',200.00,'2024-03-15 12:30:00'),(45,101101,'Investment',300.00,'2024-04-10 11:20:00'),(46,101101,'Loan Payment',120.00,'2024-05-05 09:50:00'),(47,101101,'Shopping',180.00,'2025-01-01 10:10:00'),(48,101101,'Pay Bill',90.00,'2025-01-05 15:20:00'),(49,101101,'Transfer',210.00,'2025-01-10 13:30:00'),(50,101101,'Subscription',50.00,'2025-01-15 14:50:00'),(51,101101,'Refund',60.00,'2025-01-20 11:45:00');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-24  5:58:10
