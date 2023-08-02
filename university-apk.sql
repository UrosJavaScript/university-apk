-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 02, 2023 at 12:28 PM
-- Server version: 5.7.31
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `university-apk`
--

-- --------------------------------------------------------

--
-- Table structure for table `formular`
--

DROP TABLE IF EXISTS `formular`;
CREATE TABLE IF NOT EXISTS `formular` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `email` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `form_name` text NOT NULL,
  `form_status` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `waiting_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `formular`
--

INSERT INTO `formular` (`id`, `name`, `email`, `phone`, `form_name`, `form_status`, `created_at`, `waiting_time`) VALUES
(4, 'DEJAN 012', 'dejan@gmail.com', '069899898', 'matematika', 'SUCCESS', NULL, NULL),
(6, 'Stefan ', 'stefan2@gmail.com', '0323232', 'aaaaa', 'proccess', NULL, NULL),
(10, 'test mejl', 'test2023@gmail.com', '0232333', 'samot test ispit', 'pending', NULL, NULL),
(50, 'PERA', 'urke@gmail.com', '122212', 'Pravo', 'pending', '2023-08-02 11:47:59', NULL),
(48, 'URKE96', 'roberto@gmail.com', '7878787', 'URKE96', 'STATUS success', '2023-08-02 11:00:58', '2023-08-01 22:00:19');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
CREATE TABLE IF NOT EXISTS `registration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL,
  `permission` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `username`, `email`, `password`, `permission`) VALUES
(16, 'KACA KACA', 'kaca2@gmail.com', '125ddddDDDDDD', 'user'),
(15, 'URos Kovcic', 'urke@gmail.com', '123456DDDrr', 'user'),
(13, 'Robert', 'roberto@gmail.com', '1235DDDrrr', 'user'),
(11, 'Admin', 'admin@university.com', 'AdminUros2023', 'admin'),
(12, 'deki20234777', 'dejan@gmail.com', 'aasddaSSS888', 'user');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
