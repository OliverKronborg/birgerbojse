-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Vært: 127.0.0.1
-- Genereringstid: 03. 10 2018 kl. 15:03:28
-- Serverversion: 5.6.24
-- PHP-version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `birgers_bolcher`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `acidityses`
--

CREATE TABLE IF NOT EXISTS `acidityses` (
  `id` int(11) NOT NULL,
  `aciditys` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `acidityses`
--

INSERT INTO `acidityses` (`id`, `aciditys`) VALUES
(1, 'sødt'),
(2, 'let bittert'),
(3, 'bittert');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `bolche`
--

CREATE TABLE IF NOT EXISTS `bolche` (
  `id` int(11) NOT NULL,
  `names` varchar(16) NOT NULL,
  `colors` int(11) NOT NULL,
  `weights` decimal(6,2) NOT NULL,
  `taste_aciditys` int(11) NOT NULL,
  `taste_strengths` int(11) NOT NULL,
  `taste_types` varchar(16) NOT NULL,
  `prices` decimal(6,2) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `bolche`
--

INSERT INTO `bolche` (`id`, `names`, `colors`, `weights`, `taste_aciditys`, `taste_strengths`, `taste_types`, `prices`) VALUES
(1, 'jordbær', 1, '11.00', 1, 1, '4', '16.00'),
(2, 'Appelsin', 4, '12.00', 1, 1, '2', '13.00'),
(3, 'citron', 2, '10.00', 3, 1, '3', '14.00'),
(4, 'salmiaktop', 3, '6.00', 1, 3, '5', '12.00'),
(5, 'blå haj', 6, '22.00', 2, 2, '1', '19.00'),
(6, 'rød perle', 1, '8.00', 1, 2, '4', '9.00'),
(7, 'gul perle', 2, '8.00', 3, 2, '3', '10.00'),
(8, 'blå perle', 5, '8.00', 2, 3, '1', '11.00');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `colors`
--

CREATE TABLE IF NOT EXISTS `colors` (
  `id` int(11) NOT NULL,
  `color` varchar(16) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `colors`
--

INSERT INTO `colors` (`id`, `color`) VALUES
(1, 'rød'),
(2, 'gul'),
(3, 'sort'),
(4, 'orange'),
(5, 'blå'),
(6, 'lyseblå');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `strenghtses`
--

CREATE TABLE IF NOT EXISTS `strenghtses` (
  `id` int(11) NOT NULL,
  `strenghts` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `strenghtses`
--

INSERT INTO `strenghtses` (`id`, `strenghts`) VALUES
(1, 'mild'),
(2, 'medium'),
(3, 'stærk');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `typeses`
--

CREATE TABLE IF NOT EXISTS `typeses` (
  `id` int(11) NOT NULL,
  `types` varchar(16) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `typeses`
--

INSERT INTO `typeses` (`id`, `types`) VALUES
(1, 'anis'),
(2, 'appelsin'),
(3, 'citron'),
(4, 'jordbær'),
(5, 'salmial');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `acidityses`
--
ALTER TABLE `acidityses`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `bolche`
--
ALTER TABLE `bolche`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `strenghtses`
--
ALTER TABLE `strenghtses`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `typeses`
--
ALTER TABLE `typeses`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `acidityses`
--
ALTER TABLE `acidityses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- Tilføj AUTO_INCREMENT i tabel `bolche`
--
ALTER TABLE `bolche`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- Tilføj AUTO_INCREMENT i tabel `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- Tilføj AUTO_INCREMENT i tabel `strenghtses`
--
ALTER TABLE `strenghtses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- Tilføj AUTO_INCREMENT i tabel `typeses`
--
ALTER TABLE `typeses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
