-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2018 at 06:19 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mios`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(200) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `manufact` varchar(100) DEFAULT NULL,
  `cost` varchar(10) DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `lastmod` int(11) DEFAULT NULL,
  `page` varchar(2000) DEFAULT NULL,
  `source` varchar(2000) DEFAULT NULL,
  `models` varchar(1000) DEFAULT NULL,
  `colour` varchar(1000) DEFAULT NULL,
  `textureimg` varchar(1000) DEFAULT NULL,
  `warranty` varchar(1000) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `path` varchar(500) DEFAULT NULL,
  `images` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
