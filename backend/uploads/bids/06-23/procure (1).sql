-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2023 at 05:53 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `procure`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_pending_requests_by_branch_id` (IN `branch_id` INT)  BEGIN
    DECLARE user_ids VARCHAR(255);
    DECLARE user_id INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur CURSOR FOR SELECT user_id FROM user WHERE branch_id = branch_id;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO user_id;
        IF done THEN
            LEAVE read_loop;
        END IF;
        SET @query = CONCAT('SELECT ra.req_id AS request_id, b.branch_name, b.branch_id, i.item_name, i.item_id, i.price, a.quantity, \'Additional\' AS purpose, a.time_of_purchase, ra.req_app_id, ra.user_id, ra.req_status FROM request_approve ra JOIN additional_request a ON a.add_id = ra.req_id JOIN item i ON a.item_id = i.item_id JOIN user u ON a.user_id = u.user_id JOIN branch b ON u.branch_id = b.branch_id WHERE ra.req_status = \'Pending\' AND a.user_id = ', user_id);
        PREPARE stmt FROM @query;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END LOOP;
    CLOSE cur;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_concerned` (IN `fname` VARCHAR(30), IN `lname` VARCHAR(30), IN `position` VARCHAR(30), IN `branch_id` INT, IN `username` VARCHAR(15), IN `password` VARCHAR(50), IN `specialize` VARCHAR(50))  insert into user values ('',@fname,@lname,@position,@branch_id,@username,@password)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `additional_request`
--

CREATE TABLE `additional_request` (
  `add_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `time_of_purchase` int(11) NOT NULL,
  `title_of_post` varchar(50) NOT NULL,
  `other_reason` varchar(50) NOT NULL,
  `requested_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `additional_request`
--

INSERT INTO `additional_request` (`add_id`, `user_id`, `item_id`, `quantity`, `time_of_purchase`, `title_of_post`, `other_reason`, `requested_date`) VALUES
(41, 1, 1, 3, 2, 'title', 'New Employee', '0000-00-00'),
(42, 2, 1, 8, 2, 'Manager_Chare', 'New Employee', '0000-00-00'),
(43, 3, 5, 30, 4, 'Manager_Chare', 'dasfds', '0000-00-00'),
(44, 2, 2, 3, 2, 'swivel CHair', 'New Employee', '0000-00-00'),
(45, 1, 1, 50, 2, 'Manager_Chare', 'New Employee', '0000-00-00'),
(46, 1, 5, 8, 1, 'Car', 'New Manager', '0000-00-00'),
(47, 1, 1, 20, 3, 'Table', 'New Employee', '0000-00-00'),
(50, 10, 6, 22, 2, 'web cam', 'New Room', '0000-00-00'),
(51, 10, 6, 22, 2, 'web cam', 'New Room', '0000-00-00'),
(52, 10, 6, 22, 2, 'web cam', 'New Room', '0000-00-00'),
(53, 10, 6, 1, 3, 'web cam', 'NEw Employee', '0000-00-00'),
(54, 2, 1, 50, 1, 'Car', 'Damage', '0000-00-00'),
(55, 1, 4, 26, 2001, 'manager chairs', 'New employee', '2023-05-25'),
(56, 1, 1, 50, 1970, 'manager Chair', 'New Employee', '2023-05-27'),
(57, 1, 1, 50, 1970, 'manager Chair', 'New Employee', '2023-05-27'),
(58, 1, 1, 50, 1970, 'manager Chair', 'New Employee', '2023-05-27');

--
-- Triggers `additional_request`
--
DELIMITER $$
CREATE TRIGGER `additional_request_after_insert` AFTER INSERT ON `additional_request` FOR EACH ROW INSERT INTO request_approve VALUES('',NEW.user_id,NEW.add_id,'Pending')
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ad_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `First_Name` int(11) NOT NULL,
  `Last_Name` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bid`
--

CREATE TABLE `bid` (
  `bid_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL,
  `unit` varchar(30) NOT NULL,
  `tender_type` varchar(30) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bid`
--

INSERT INTO `bid` (`bid_id`, `user_id`, `cat_id`, `quantity`, `price`, `unit`, `tender_type`, `status`, `date`) VALUES
(10, 12, 2, 3, 30000, 'pc', 'Open Tender', 0, '2023-05-27');

--
-- Triggers `bid`
--
DELIMITER $$
CREATE TRIGGER `update_date_filter_needs` AFTER INSERT ON `bid` FOR EACH ROW BEGIN
IF NOT EXISTS (
  SELECT fn.filter_id
  FROM filter_needs fn
  LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
  LEFT JOIN additional_request ar ON ar.add_id = ra.req_id
  LEFT JOIN item i ON i.item_id = ar.item_id
  WHERE i.cat_id = NEW.cat_id AND ar.add_id IS NOT NULL AND fn.Date IS NULL

  UNION

  SELECT fn.filter_id
  FROM filter_needs fn
  LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
  LEFT JOIN replacement rp ON rp.rep_id = ra.req_id
  LEFT JOIN item i ON i.item_id = rp.item_id
  WHERE i.cat_id = NEW.cat_id AND rp.rep_id IS NOT NULL AND fn.Date IS NULL
) THEN
  UPDATE filter_needs
  SET date = CURRENT_DATE(), status = 1
  WHERE filter_id IN (
    SELECT fn.filter_id
    FROM filter_needs fn
    LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
    LEFT JOIN additional_request ar ON ar.add_id = ra.req_id
    LEFT JOIN item i ON i.item_id = ar.item_id
    WHERE i.cat_id = NEW.cat_id AND ar.add_id IS NOT NULL

    UNION

    SELECT fn.filter_id
    FROM filter_needs fn
    LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
    LEFT JOIN replacement rp ON rp.rep_id = ra.req_id
    LEFT JOIN item i ON i.item_id = rp.item_id
    WHERE i.cat_id = NEW.cat_id AND rp.rep_id IS NOT NULL
  );
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `Branch_id` int(11) NOT NULL,
  `Branch_Name` varchar(50) NOT NULL,
  `District_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`Branch_id`, `Branch_Name`, `District_id`) VALUES
(1, 'sarbet', 1),
(2, 'abageda', 4),
(3, 'bole', 1),
(4, 'mekanisa', 4),
(5, 'Head Office', 1),
(6, 'Jomo', 5),
(7, 'LOGIA-SEMERA', 1),
(8, 'SEMERA', 1),
(9, 'DEBRE BIRHAN', 1),
(10, 'ARERTI', 1),
(11, 'BALCHI', 1),
(12, 'ATSE ZERAYAKOB', 1),
(13, 'SHEWA ROBIT', 1),
(14, 'ENWARI', 1),
(15, 'JEHUR', 1),
(16, 'TEBASSIE', 1),
(17, 'DIRE DAWA', 1),
(18, 'ALLAY BADEY', 1),
(19, 'SABIAN', 1),
(20, 'HARRAR', 1),
(21, 'ARATEGNA AKABABI HARRAR', 1),
(22, 'HARAR ABADIR', 1),
(23, 'GELAN', 1),
(24, 'GEBREGURACH', 1),
(25, 'ADAMA', 1),
(26, 'MODJO', 1),
(27, 'BISHOFTU', 1),
(28, 'ABA GEDA', 1),
(29, 'ASELLA', 1),
(30, 'BERECHA ADAMA', 1),
(31, 'AWASH SEBAT KILO', 1),
(32, 'DUKEM', 1),
(33, 'METEHARA', 1),
(34, 'SAGURIE', 1),
(35, 'HOLETA', 1),
(36, 'HORA', 1),
(37, 'MODJO DRY PORT', 1),
(38, 'ADAMA BOSET', 1),
(39, 'MODJO MENAHARIA', 1),
(40, 'FITCHE', 1),
(41, 'ITEYA', 1),
(42, 'ADEA BISHOFTU', 1),
(43, 'AMBO', 1),
(44, 'DERA', 1),
(45, 'SAR TERA ADAMA', 1),
(46, 'BABILE', 1),
(47, 'SENDAFA', 1),
(48, 'SHENO', 1),
(49, 'CHIRO', 1),
(50, 'HUEUTA', 1),
(51, 'BEKOJI', 1),
(52, 'CHILALO', 1),
(53, 'CHEFE DONSA', 1),
(54, 'JIJIGA', 1),
(55, 'TOGO CHALE', 1),
(56, 'HALAL_IFB', 1),
(57, 'Alyuamba', 1),
(58, 'Adama Bole', 1),
(59, 'BOLE', 6),
(60, 'YERER BER', 6),
(61, 'BOLE MEDEHANIALEM', 6),
(62, 'CMC', 6),
(63, 'AFRICA AVENUE', 6),
(64, 'HAYAHULET', 6),
(65, 'HIBER', 6),
(66, 'MERI LOKE', 6),
(67, 'KOTEBE', 6),
(68, 'GERJI', 6),
(69, 'BESHALE', 6),
(70, 'SUMMIT CONDOMINIUM', 6),
(71, 'SUMMIT', 6),
(72, 'AYAT', 6),
(73, 'SHALLA', 6),
(74, 'MOENCO', 6),
(75, 'HAYARAT', 6),
(76, 'IMPERIAL', 6),
(77, 'FIGA BESHALE', 6),
(78, 'AYAT MALL', 6),
(79, 'LAMBERET', 6),
(80, 'JACKROSS', 6),
(81, 'YERER GORO', 6),
(82, 'KOTEBE MESALEMIA', 6),
(83, 'HAYAHULET ADEBABAY', 6),
(84, 'LAMBERET MENEHARIA', 6),
(85, 'MEHAL MERI', 6),
(86, 'BOLE HAYAOSET', 6),
(87, 'AYAT BESHALE', 6),
(88, 'BOLE 17', 6),
(89, 'GERJI MEBRAT HAIL', 6),
(90, 'CMC MICHAEL', 6),
(91, 'MEHAL SUMMIT', 6),
(92, 'YEKA ABADO CONDOMINUM', 6),
(93, 'BOLE ARBSA CONDOMINUM', 6),
(94, 'AYAT 72', 6),
(95, '22 GEBRIEL', 6),
(96, 'DEJAZEMACH WONDIRAD', 6),
(97, 'KARA ALO', 6),
(98, 'AYAT 49', 6),
(99, 'FLAMINGO', 6),
(100, 'Ayat 5', 6),
(101, 'SUMMIT SAFARI', 6),
(102, 'ATHELET MESERET DEFAR', 6),
(103, 'GERJI MARIAM', 6),
(104, 'AYAT TAFO', 6),
(105, 'MEHAL GERJI', 6),
(106, 'GORO SEFERA', 6),
(107, '22 MEGENAGNA', 6),
(108, 'GURD SHOLA', 6),
(109, 'OLYMPIA', 6),
(110, 'Gerji Giorgis', 6),
(111, 'Ayat Zone 3', 6),
(112, 'LEGETAFO', 6),
(113, 'Sadaqa_IFB', 6),
(114, '22 Mazoria', 6),
(115, 'HILTON', 5),
(116, 'LAGAHAR', 5),
(117, 'MEHAL ARADA', 5),
(118, 'MISRAK', 5),
(119, 'SHIRO MEDA', 5),
(120, 'GULLELE', 5),
(121, 'MESKEL SQUARE', 5),
(122, 'ITEGUE TAITU', 5),
(123, 'ADDISU GEBEYA', 5),
(124, 'KEBENA', 5),
(125, 'SIDIST KILO', 5),
(126, 'CATHEDRAL', 5),
(127, 'MEGENAGNA', 5),
(128, 'URAEL', 5),
(129, 'GANDI', 5),
(130, 'SHOLLA GEBEYA', 5),
(131, 'STADIUM', 5),
(132, 'ABUNE PETROS', 5),
(133, 'ARAT KILO', 5),
(134, 'BALDERAS', 5),
(135, 'FERENSAY LEGASION', 5),
(136, 'ECA', 5),
(137, 'RAS DESTA', 5),
(138, 'SIGNAL', 5),
(139, 'BAMBIS', 5),
(140, 'ENDERASIE', 5),
(141, 'KECHENE', 5),
(142, 'AFINCHO BER', 5),
(143, 'SHEGER', 5),
(144, 'ANBESSA GIBI', 5),
(145, 'WUHA LIMAT', 5),
(146, 'MEGENAGNA ADEBABAY', 5),
(147, 'GENET EYESUS', 5),
(148, 'DIL BER', 5),
(149, 'LUCY AMIST KILO', 5),
(150, 'CONGO ZEMACH', 5),
(151, 'YEKA', 5),
(152, 'GEDAM SEFER', 5),
(153, 'HABTE GIORGIS', 5),
(154, 'LEM', 5),
(155, 'SEBASTOPOL', 5),
(156, 'CHILOT ADEBABAY', 5),
(157, 'GOLLA SEFER', 5),
(158, 'FERENSAY GURARA', 5),
(159, 'NUR', 5),
(160, 'RICHE', 5),
(161, 'AWOLIA', 5),
(162, 'HIBIR TOWER', 5),
(163, 'Pastor Adebabay', 5),
(164, 'Gullele Goma Adebabay', 5),
(165, 'Signa Sholla', 5),
(166, 'SULULTA', 5),
(167, 'WESRBIE', 5),
(168, 'DESSIE', 9),
(169, 'WOLDIA', 9),
(170, 'KOMBOLCHA', 9),
(171, 'MUGAD DESSIE', 9),
(172, 'KOBO', 9),
(173, 'BUANBUA WUHA', 9),
(174, 'KEMISSIE', 9),
(175, 'SEKOTA', 9),
(176, 'BATI', 9),
(177, 'HARBU', 9),
(178, 'HAIK', 9),
(179, 'MEKANE SELAM', 9),
(180, 'LALIBELA', 9),
(181, 'MEKELE', 9),
(182, 'ALAMATA', 9),
(183, 'SHIRE', 9),
(184, 'ATSE YOHANNES', 9),
(185, 'AXUM', 9),
(186, 'ADIGRAT', 9),
(187, 'EDAGA MEKELE', 9),
(188, 'MEHONI', 9),
(189, 'WUKRO', 9),
(190, 'ADIHAKI', 9),
(191, 'ADWA', 9),
(192, 'HUMERA', 9),
(193, 'SHIRARO', 9),
(194, 'MEDA AGAME', 9),
(195, 'MICHEW', 9),
(196, 'MEKELLE ATIKILT TERA', 9),
(197, 'CASTEL MEKELLE', 9),
(198, 'KUKUFTU', 9),
(199, 'ADI HAWSI', 9),
(200, 'QWIHA', 9),
(201, 'ENTICHO', 9),
(202, 'ABI-ADI', 9),
(203, 'SHIRE ENDASILASSIE', 9),
(204, 'MAYKADRA', 9),
(205, 'NIGISTE SABA', 9),
(206, 'KOREM', 9),
(207, 'ADI-HA', 9),
(208, 'Edaga-Hamus', 9),
(209, 'FASIL', 9),
(210, 'BAHIRDAR', 9),
(211, 'BURE DAMOT', 9),
(212, 'DEBARK', 9),
(213, 'METEMA', 9),
(214, 'TEWODROS', 9),
(215, 'MARAKI-GONDAR', 9),
(216, 'MEHAL-BAHIR DAR', 9),
(217, 'DEBRE MARKOS', 9),
(218, 'DEBRE TABORB', 9),
(219, 'SHINDI', 9),
(220, 'DABAT', 9),
(221, 'GISH ABAY', 9),
(222, 'FELEGE HIWOT', 9),
(223, 'METEMA YOHANNES', 9),
(224, 'MANKUSA', 9),
(225, 'AYKEL', 9),
(226, 'AZEZO', 9),
(227, 'WOGEL TENA', 9),
(228, 'DELGHI', 9),
(229, 'ADET BER', 9),
(230, 'FINOTE-SELAM', 9),
(231, 'ENJIBARA', 9),
(232, 'JIGA', 9),
(233, 'ADET', 9),
(234, 'BICHENA', 9),
(235, 'MOTTA', 9),
(236, 'KUCH', 9),
(237, 'ABAY MADO', 9),
(238, 'WERETA', 9),
(239, 'AMBA GIORGIS', 9),
(240, 'DURBETE', 9),
(241, 'MERAWI', 9),
(242, 'BEREKA-IFB', 9),
(243, 'CHAGNI', 9),
(244, 'KEGN BET_IFB', 9),
(245, 'JAWI', 9),
(246, 'Addis Kidam', 9),
(247, 'GUZARA', 9),
(248, 'DONA BER', 9),
(249, 'BEKLOBET', 4),
(250, 'KALITY', 4),
(251, 'WELO SEFER', 4),
(252, 'GOFA', 4),
(253, 'GENET', 4),
(254, 'LEBU LAFTO', 4),
(255, 'YOSEPH', 4),
(256, 'MESKEL FLOWER', 4),
(257, 'KALITY SALO', 4),
(258, 'MILLENNIUM', 4),
(259, 'KERA', 4),
(260, 'BOLE BULBULA', 4),
(261, 'GOFA MAZORIA', 4),
(262, 'GELAN CONDOMINIUM', 4),
(263, 'GOTERA', 4),
(264, 'JEMO', 4),
(265, 'LBU ERTU', 4),
(266, 'AKAKI GARA DUBA', 4),
(267, 'LUNCHA', 4),
(268, 'BOLE AIRPORT', 4),
(269, 'SARIS ZENIBABA', 4),
(270, 'HANA MARIAM', 4),
(271, 'GOFA CAMP', 4),
(272, 'LEBU SEFERA', 4),
(273, 'HAILE GARMENT CONDOMINIUM', 4),
(274, 'SARIS TOTAL', 4),
(275, 'SARIS ADDISU SEFER', 4),
(276, 'BOLE BULBULA ST MARY MAZORIA', 4),
(277, 'TULU DIMTU CONDOMINIUM', 4),
(278, 'MEKANISA', 4),
(279, 'TULU DIMTU GEBEYA', 4),
(280, 'LAFTO', 4),
(281, 'KALITY SHEGER', 4),
(282, 'BOLE RWANDA', 4),
(283, 'BULBULA 93', 4),
(284, 'GOTERA CONDOMINUM', 4),
(285, 'AKAKI GEBEYA', 4),
(286, 'SARIS ABO', 4),
(287, 'SARIS', 4),
(288, 'MEKANISA MICHAEL', 4),
(289, 'TULUDIMTU', 4),
(290, 'Kality St. Gebriel', 4),
(291, 'Rizq_IFB', 4),
(292, 'AYER ABMA', 4),
(293, 'St. YARED', 4),
(294, 'SHASHEMENE', 2),
(295, 'ARADA SHASHEMENE', 2),
(296, 'BALE ROBE', 2),
(297, 'BATU', 2),
(298, 'MEKI', 2),
(299, 'NEGELE', 2),
(300, 'ARSI NEGELLE', 2),
(301, 'HALABA BER SHASHEMENE', 2),
(302, 'AWASHO SHASHEMENE', 2),
(303, 'YABELLO', 2),
(304, 'BULE HORA', 2),
(305, 'BOTE', 2),
(306, 'GINIR', 2),
(307, 'DODOLA', 2),
(308, 'Moyale', 2),
(309, 'AL-NUR_IFB', 2),
(310, 'AWASSA', 2),
(311, 'ARAB SEFER- AWASSA', 2),
(312, 'MENEHARIA AWASSA', 2),
(313, 'ATOTE HAWASSA', 2),
(314, 'TURUFAT HAWASSA', 2),
(315, 'RHAMA_IFB', 2),
(316, 'ALETA CHUKO', 2),
(317, 'HOSAENA', 2),
(318, 'WOLAITA SODO', 2),
(319, 'ARBAMINCH', 2),
(320, 'YELA SAWLA', 2),
(321, 'DILLA', 2),
(322, 'WERABE', 2),
(323, 'BUTAJIRA', 2),
(324, 'DALOCHA', 2),
(325, 'YIRGACHEFE', 2),
(326, 'JINKA', 2),
(327, 'HALABA', 2),
(328, 'AREKA', 2),
(329, 'DOYOGENA', 2),
(330, 'HADERO', 2),
(331, 'SHONE', 2),
(332, 'SHINSHICHO', 2),
(333, 'BODITY', 2),
(334, 'GOMBORA', 2),
(335, 'ARADA HOSSAENA', 2),
(336, 'ASSOSA', 3),
(337, 'BAMBASI', 3),
(338, 'SHEIKH KHOJELE', 3),
(339, 'GAMBELLA', 3),
(340, 'NEWLANDGAMBELLA', 3),
(341, 'BARO MEDA', 3),
(342, 'DIMA', 3),
(343, 'TERFAM', 3),
(344, 'LARE', 3),
(345, 'Meti', 3),
(346, 'JIMMA', 3),
(347, 'NEKEMTE', 3),
(348, 'HERMATA JIMMA', 3),
(349, 'WOLKITE', 3),
(350, 'METTU', 3),
(351, 'MENEHARIA JIMMA', 3),
(352, 'DEMBI DOLLO', 3),
(353, 'GIMBI', 3),
(354, 'BEDELE', 3),
(355, 'WOLISO', 3),
(356, 'ANGER GUTE', 3),
(357, 'AGARO', 3),
(358, 'ABBA JIFAR_IFB', 3),
(359, 'GERA', 3),
(360, 'SAJA', 3),
(361, 'Darge', 3),
(362, 'MIZAN TEFERI', 3),
(363, 'BONGA', 3),
(364, 'MIZAN AMAN', 3),
(365, 'TARCHA', 3),
(366, 'AYER TENA', 7),
(367, 'BIRRAMBA', 7),
(368, 'BOMB TERA', 7),
(369, 'LIDETA', 7),
(370, 'MESALEMIA', 7),
(371, 'TEKLEHAIMANOT', 7),
(372, 'TANA', 7),
(373, 'BISRATE GEBRIEL', 7),
(374, 'KOLFE', 7),
(375, 'OLD AIRPORT', 7),
(376, 'ABA KORAN', 7),
(377, 'BETHEL', 7),
(378, 'SEFERE-SELAM', 7),
(379, 'ALEM BANK', 7),
(380, 'MEDHANIT', 7),
(381, 'MIRAB MERKATO', 7),
(382, 'MERKATO WENBER TERA', 7),
(383, 'MICKEY LAND CONDOMINIUM', 7),
(384, 'MERKATO MILITERY TERA', 7),
(385, 'CINEMA RAS', 7),
(386, 'D\'AFRIQUE', 7),
(387, 'TOR HAILOCH', 7),
(388, 'EHIL BERENDA', 7),
(389, 'YESHIDEBELE', 7),
(390, 'AUTOBUS TERA', 7),
(391, 'AMANUEL TOTAL', 7),
(392, 'ABEBE BIKILA STADIUM', 7),
(393, 'DARMAR', 7),
(394, 'JEMO 3 CONDOMINIUM', 7),
(395, 'ASIKO ADDISU SEFER', 7),
(396, 'LIDETA FIRD BET', 7),
(397, 'MERKATO GOMA TERA', 7),
(398, 'TEQUWA_IFB', 7),
(399, 'ANWAR_IFB', 7),
(400, 'SEBATEGNA', 7),
(401, 'SARBET', 7),
(402, 'MEKANISA ABO', 7),
(403, 'KOLFE ATANA TERA', 7),
(404, 'Bilal_IFB', 7),
(405, 'BALCH ABANEFSO', 7),
(406, 'BETEL MICHAEL', 7),
(407, 'ANFO', 7),
(408, 'MEHAL MERKATO', 7),
(409, 'AMIN_IFB', 7),
(410, 'ANSAR_IFB', 7),
(411, 'BURAYU', 7),
(412, 'FURI', 7),
(413, 'KETA BURAYU', 7),
(414, 'ALEMGENA', 7),
(415, 'SEBETA', 7),
(416, 'GEFERSA NONO', 7),
(417, 'WOLETE', 7),
(418, 'BEDIR_IFB', 7),
(419, 'QORKI WOLETE', 7);

-- --------------------------------------------------------

--
-- Table structure for table `catagory`
--

CREATE TABLE `catagory` (
  `cat_id` int(11) NOT NULL,
  `cata_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `catagory`
--

INSERT INTO `catagory` (`cat_id`, `cata_Name`) VALUES
(1, 'Computer and Related'),
(2, 'Office Furniture'),
(3, 'Corpoorate Budget Items'),
(5, 'Jase'),
(6, 'Power Installation Materials'),
(7, 'Network Installation Materials'),
(8, 'General Supply Items'),
(9, 'Printing Items'),
(10, 'Construction Items');

-- --------------------------------------------------------

--
-- Table structure for table `concerned_dep`
--

CREATE TABLE `concerned_dep` (
  `concerned_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `specialize` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `district`
--

CREATE TABLE `district` (
  `District_id` int(11) NOT NULL,
  `District_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `district`
--

INSERT INTO `district` (`District_id`, `District_Name`) VALUES
(1, 'Central and East District'),
(2, 'South  District'),
(3, 'South West District'),
(4, 'South  Addis Ababa'),
(5, 'North Addis Ababa'),
(6, 'East Addis Ababa'),
(7, 'West Addis Ababa'),
(8, 'North West District'),
(9, 'North District');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `bid_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `file_name` varchar(50) NOT NULL,
  `file_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`bid_id`, `supplier_id`, `file_name`, `file_type`) VALUES
(39, 8, '4.pdf_1680802039940', 'pdf');

-- --------------------------------------------------------

--
-- Table structure for table `filter_needs`
--

CREATE TABLE `filter_needs` (
  `filter_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `filter_req_app` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `filter_needs`
--

INSERT INTO `filter_needs` (`filter_id`, `user_id`, `filter_req_app`, `status`, `Date`) VALUES
(1, 5, 399, 0, NULL),
(2, 5, 401, 0, NULL),
(41, 5, 402, 1, '2023-05-27'),
(43, 5, 410, 0, NULL),
(59, 5, 406, 0, NULL),
(76, 5, 413, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `financial_detail`
--

CREATE TABLE `financial_detail` (
  `finance_id` int(11) NOT NULL,
  `sup_id` int(11) NOT NULL,
  `bid_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL DEFAULT 100,
  `cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `item_name`, `price`, `cat_id`) VALUES
(1, '`manager chairs`', 200, 2),
(2, '`manager chairs`', 10000, 2),
(3, 'Laptop Computer Type I', 40336, 1),
(4, 'Gurest Chair', 100, 2),
(5, 'Heavy Counting Machine', 100, 1),
(6, 'web cam', 11597, 1),
(7, 'Photo document Scanner', 7607, 1),
(8, 'Cheque Scanner multi feeder', 43428, 1),
(9, 'Passbook Printer', 40336, 1),
(10, 'Hiber debit cards', 100, 3),
(11, 'PIN Mailer', 100, 3),
(12, 'UPS Battery', 100, 3),
(13, 'Brochuer Rack', 100, 2),
(14, 'Dixon Angile shelf', 100, 2),
(15, 'Table for Sorting', 10000, 2),
(16, 'Cash Iron Box', 1000, 5),
(17, 'Safe Big', 100, 5),
(18, 'Safe Medium', 100, 5),
(19, 'Power Cable 3x2.5', 100000, 6),
(20, 'Power Cable 5x10', 100, 6),
(21, 'Breaker Box', 100, 6),
(22, 'Trunk 60x40', 100, 7),
(23, 'Patch Cord 3mts', 100, 7),
(24, 'UTP Cable Cat 6', 100, 7),
(25, 'Wall outlet node cat', 100, 7);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `msg_id` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `reciever` int(11) NOT NULL,
  `message` varchar(100) NOT NULL,
  `time` time NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`msg_id`, `sender`, `reciever`, `message`, `time`) VALUES
(18, 1, 6, 'hello', '03:10:00'),
(19, 6, 1, 'menabak felek', '03:14:00'),
(20, 1, 6, 'Yep', '03:16:13'),
(21, 1, 6, 'you', '03:17:00'),
(22, 6, 1, 'i\'m here', '03:19:19'),
(23, 1, 6, 'pick me up', '03:48:47'),
(24, 1, 6, 'where the fuck are you', '01:28:15'),
(25, 1, 6, 'Fuck You ', '01:55:54'),
(26, 6, 1, 'what the hell want you', '02:38:51'),
(27, 1, 6, 'i need your approvement', '02:40:41'),
(28, 6, 1, 'you where are you', '02:56:31'),
(29, 1, 6, 'oww i\'m home you can here', '02:56:47'),
(30, 1, 6, 'come home??', '03:23:48'),
(31, 5, 16, 'Tebelah', '03:49:09'),
(32, 5, 3, 'Give your Branch Id', '03:49:26'),
(33, 5, 10, 'Mister Jomo', '03:49:43'),
(34, 2, 10, 'Hello', '09:01:44'),
(35, 10, 2, 'go to hell', '09:02:50'),
(36, 1, 2, 'hello lele', '00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `previlage`
--

CREATE TABLE `previlage` (
  `prev_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `previlage` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `replacement`
--

CREATE TABLE `replacement` (
  `rep_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `time_of_purchase` int(11) NOT NULL,
  `tag_no` varchar(100) NOT NULL,
  `service_year` int(11) NOT NULL,
  `frequency_of_rep` int(11) NOT NULL,
  `book_value` int(11) NOT NULL,
  `requested_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `replacement`
--

INSERT INTO `replacement` (`rep_id`, `user_id`, `item_id`, `quantity`, `time_of_purchase`, `tag_no`, `service_year`, `frequency_of_rep`, `book_value`, `requested_date`) VALUES
(1002, 1, 3, 1, 3, 'title', 0, 0, 12, '0000-00-00'),
(1003, 2, 6, 5, 2, 'swivel CHair', 0, 0, 11, '0000-00-00'),
(1004, 10, 11, 5, 2, 'web cam', 0, 0, 2, '0000-00-00'),
(1005, 1, 4, 26, 0, '', 0, 0, 0, '2023-05-25'),
(1006, 1, 4, 26, 0, 'ASDFGH', 3, 2, 2, '2023-05-25');

--
-- Triggers `replacement`
--
DELIMITER $$
CREATE TRIGGER `replacement_request_after_insert` AFTER INSERT ON `replacement` FOR EACH ROW INSERT INTO `request_approve` VALUES ('', '', NEW.rep_id, 'Pending')
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `replacement_trigger_33` AFTER INSERT ON `replacement` FOR EACH ROW BEGIN
INSERT INTO request_approve VALUES ('','', 33, 'Pending');
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `request_approve`
--

CREATE TABLE `request_approve` (
  `req_app_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT 0,
  `req_id` int(11) DEFAULT NULL,
  `req_status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request_approve`
--

INSERT INTO `request_approve` (`req_app_id`, `user_id`, `req_id`, `req_status`) VALUES
(397, 7, 41, 'Approve'),
(399, 8, 1002, 'Approve'),
(400, 6, 42, 'Approve'),
(401, 7, 43, 'Approve'),
(402, 6, 44, 'Approve'),
(404, 6, 1003, 'Approve'),
(405, 7, 45, 'Approve'),
(406, 6, 46, 'Approve'),
(407, 8, 47, 'Approve'),
(410, 12, 50, 'Approve'),
(411, 10, 51, 'Pending'),
(412, 10, 52, 'Pending'),
(413, 12, 53, 'Approve'),
(414, 0, 33, 'Pending'),
(415, 12, 1004, 'Approve'),
(416, 6, 54, 'Approve'),
(417, 1, 55, 'Pending'),
(418, 0, 33, 'Pending'),
(419, 0, 1005, 'Pending'),
(420, 0, 33, 'Pending'),
(421, 1, 1006, 'Reject'),
(422, 1, 56, 'Pending'),
(423, 1, 57, 'Pending'),
(424, 1, 58, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplier_id` int(11) NOT NULL,
  `tin_number` varchar(50) NOT NULL,
  `FIrst_Name` varchar(50) NOT NULL,
  `Last_Name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplier_id`, `tin_number`, `FIrst_Name`, `Last_Name`, `username`, `password`) VALUES
(8, '12345678', 'supplier', 'supplier', 'supplier', '25d55ad283aa400af464c76d713c07ad');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `First_Name` varchar(30) NOT NULL,
  `Last_Name` varchar(30) NOT NULL,
  `position` varchar(30) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `First_Name`, `Last_Name`, `position`, `branch_id`, `username`, `password`) VALUES
(1, 'assistant', 'sarbet', 'assistant', 1, 'ass_sarbet', '25d55ad283aa400af464c76d713c07ad'),
(2, 'assistant', 'abageda', 'assistant', 2, 'ass_abageda', '25d55ad283aa400af464c76d713c07ad'),
(3, 'assistant', 'mekanisa', 'assistant', 4, 'ass_mekanisa', '25d55ad283aa400af464c76d713c07ad'),
(4, 'assistant', 'bole', 'assistant', 3, 'ass_bole', '25d55ad283aa400af464c76d713c07ad'),
(5, 'Market', 'Officer', 'marketofficer', 5, 'mar_officer', '25d55ad283aa400af464c76d713c07ad'),
(6, 'manager', 'abageda', 'manager', 2, 'man_abageda', '25d55ad283aa400af464c76d713c07ad'),
(7, 'manager', 'sarbet', 'manager', 1, 'man_sarbet', '25d55ad283aa400af464c76d713c07ad'),
(8, 'manager', 'mekanisa', 'manager', 4, 'man_mekanissa', '25d55ad283aa400af464c76d713c07ad'),
(9, 'manager', 'bole', 'manager', 3, 'man_bole', '25d55ad283aa400af464c76d713c07ad'),
(10, 'assistant', 'Jomo', 'assistant', 6, 'ass_jomo', '25d55ad283aa400af464c76d713c07ad'),
(12, 'manager', 'Jomo', 'manager', 6, 'man_jomo', '25d55ad283aa400af464c76d713c07ad'),
(14, 'Approval', 'aproval', 'approvalbody', 5, 'app_heads', '12345678'),
(16, 'Supplier', 'supplier', 'supplier', 1, 'supplier', '12345678');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `additional_request`
--
ALTER TABLE `additional_request`
  ADD PRIMARY KEY (`add_id`),
  ADD KEY `additional_request_ibfk_1` (`item_id`),
  ADD KEY `Assistant_id` (`user_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ad_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Indexes for table `bid`
--
ALTER TABLE `bid`
  ADD PRIMARY KEY (`bid_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`Branch_id`),
  ADD KEY `District_id` (`District_id`);

--
-- Indexes for table `catagory`
--
ALTER TABLE `catagory`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `concerned_dep`
--
ALTER TABLE `concerned_dep`
  ADD PRIMARY KEY (`concerned_id`);

--
-- Indexes for table `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`District_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`bid_id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `filter_needs`
--
ALTER TABLE `filter_needs`
  ADD PRIMARY KEY (`filter_id`),
  ADD UNIQUE KEY `filter_req_app` (`filter_req_app`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `financial_detail`
--
ALTER TABLE `financial_detail`
  ADD KEY `sup_id` (`sup_id`),
  ADD KEY `bid_id` (`bid_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`msg_id`),
  ADD KEY `message_ibfk_1` (`reciever`),
  ADD KEY `sender` (`sender`);

--
-- Indexes for table `previlage`
--
ALTER TABLE `previlage`
  ADD PRIMARY KEY (`prev_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Indexes for table `replacement`
--
ALTER TABLE `replacement`
  ADD PRIMARY KEY (`rep_id`),
  ADD KEY `Assistant_id` (`user_id`),
  ADD KEY `replacement_ibfk_2` (`item_id`);

--
-- Indexes for table `request_approve`
--
ALTER TABLE `request_approve`
  ADD PRIMARY KEY (`req_app_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `branch_id` (`branch_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `additional_request`
--
ALTER TABLE `additional_request`
  MODIFY `add_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ad_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bid`
--
ALTER TABLE `bid`
  MODIFY `bid_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `Branch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=420;

--
-- AUTO_INCREMENT for table `catagory`
--
ALTER TABLE `catagory`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `concerned_dep`
--
ALTER TABLE `concerned_dep`
  MODIFY `concerned_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `district`
--
ALTER TABLE `district`
  MODIFY `District_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `bid_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `filter_needs`
--
ALTER TABLE `filter_needs`
  MODIFY `filter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `msg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `previlage`
--
ALTER TABLE `previlage`
  MODIFY `prev_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `replacement`
--
ALTER TABLE `replacement`
  MODIFY `rep_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1007;

--
-- AUTO_INCREMENT for table `request_approve`
--
ALTER TABLE `request_approve`
  MODIFY `req_app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=425;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `additional_request`
--
ALTER TABLE `additional_request`
  ADD CONSTRAINT `additional_request_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`Branch_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bid`
--
ALTER TABLE `bid`
  ADD CONSTRAINT `bid_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `branch`
--
ALTER TABLE `branch`
  ADD CONSTRAINT `branch_ibfk_1` FOREIGN KEY (`District_id`) REFERENCES `district` (`District_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `filter_needs`
--
ALTER TABLE `filter_needs`
  ADD CONSTRAINT `filter_needs_ibfk_1` FOREIGN KEY (`filter_req_app`) REFERENCES `request_approve` (`req_app_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `filter_needs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `financial_detail`
--
ALTER TABLE `financial_detail`
  ADD CONSTRAINT `financial_detail_ibfk_1` FOREIGN KEY (`sup_id`) REFERENCES `supplier` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `financial_detail_ibfk_2` FOREIGN KEY (`bid_id`) REFERENCES `bid` (`bid_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `catagory` (`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`reciever`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`sender`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `previlage`
--
ALTER TABLE `previlage`
  ADD CONSTRAINT `previlage_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `previlage_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`Branch_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `replacement`
--
ALTER TABLE `replacement`
  ADD CONSTRAINT `replacement_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`Branch_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
