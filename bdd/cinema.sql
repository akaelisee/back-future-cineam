-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 08 avr. 2021 à 00:02
-- Version du serveur :  10.4.14-MariaDB
-- Version de PHP : 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cinema`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id_client` int(11) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_client`, `lastname`, `firstname`, `email`, `password`) VALUES
(2, 'loba', 'yvan', 'yvan@gmail.com', '$2a$10$Fc18MK5M9j9COmgUkSQnbemd.NRZjzGI94afNCOw9dcI4VbeZNbnq'),
(3, 'lobayvan', 'lobayvan', 'yvann@gmail.com', '$2a$10$08/4q6qjJwxiIXMzXvCT8.fAp2HqSwI/Wok/m3F1OZNNLA2ls.OwC'),
(4, 'manuelaaa', 'manuelaaa', 'manuelaaa@gmail.com', '$2a$10$oF2/7BgrwV6H7poQDWetyeeFkO7k2Ct/gbS4/BxbWarGs600CgsvW'),
(6, 'abelooo', 'abelooo', 'abelooo@gmail.com', '$2a$10$QL87dj10RzcIIAm1lVlom.AP0MmOIkEtPX5tpzKknynIW.Axg1Tvq'),
(7, 'labellla', 'labellla', 'labellla@fg.com', '$2a$10$5nbk/F0M7OaPAocXisssS.WSWRcQgwlRULHkxTclstOdmHPfrhQSG');

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

CREATE TABLE `contacts` (
  `id_contact` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `suject` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `genres`
--

CREATE TABLE `genres` (
  `id_genre` int(11) NOT NULL,
  `lib_genre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `genres`
--

INSERT INTO `genres` (`id_genre`, `lib_genre`) VALUES
(1, 'Actions'),
(2, 'Horreur'),
(3, 'Aventure'),
(4, 'Animation'),
(5, 'Romance'),
(6, 'Fantastique'),
(7, 'Science fiction');

-- --------------------------------------------------------

--
-- Structure de la table `movies`
--

CREATE TABLE `movies` (
  `id_movie` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `overview` varchar(254) NOT NULL,
  `poster_path` varchar(100) NOT NULL,
  `backdrop_path` varchar(255) NOT NULL,
  `time` varchar(200) NOT NULL,
  `release_date` varchar(25) NOT NULL,
  `id_genre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `movies`
--

INSERT INTO `movies` (`id_movie`, `title`, `overview`, `poster_path`, `backdrop_path`, `time`, `release_date`, `id_genre`) VALUES
(1, 'Godzilla vs. Kong', 'In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.', 'http://res.cloudinary.com/dnozx04tw/image/upload/v1617794351/vhovnsvuaa3cfifhwmwd.jpg', 'https://res.cloudinary.com/dnozx04tw/image/upload/v1617797379/jMWkd0fuwbG39eJpzycJzPWMCww_ia6ktp.jpg', '1h 53m', '2021-04-07T11:15:45.535Z', 7),
(2, 'Zack Snyder\'s Justice League', 'Determined to ensure Superman\'s ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions', 'https://res.cloudinary.com/dnozx04tw/image/upload/v1617794590/zf2hstu0xuukwccwtcwa.jpg', 'https://res.cloudinary.com/dnozx04tw/image/upload/v1617798255/pcDc2WJAYGJTTvRSEIpRZwM3Ola_pjkijp.jpg', '4h 2m', '2021-04-07T11:20:45.535Z', 1),
(3, 'Raya and the Last Dragon', 'Long ago, in the fantasy world of Kumandra, humans and dragons lived together in harmony. But when an evil force threatened the land, the dragons sacrificed themselves to save humanity. Now, 500 years later, that same evil has returned and it’s up to a l', 'http://res.cloudinary.com/dnozx04tw/image/upload/v1617795184/yc0sdu5dandqx28nvk67.jpg', 'https://res.cloudinary.com/dnozx04tw/image/upload/v1617797615/hJuDvwzS0SPlsE6MNFOpznQltDZ_x8nh41.jpg', '1h 54m', '2021-04-07T11:30:20.401Z', 4),
(4, 'Tom & Jerry', 'Tom the cat and Jerry the mouse get kicked out of their home and relocate to a fancy New York hotel, where a scrappy employee named Kayla will lose her job if she can’t evict Jerry before a high-class wedding at the hotel. Her solution? Hiring Tom to get', 'http://res.cloudinary.com/dnozx04tw/image/upload/v1617795362/hai5uggdcxzz4vsblyrv.jpg', 'https://res.cloudinary.com/dnozx04tw/image/upload/v1617797729/fev8UFNFFYsD5q7AcYS8LyTzqwl_pzqnqr.jpg', '1h 41m', '2021-04-07T11:33:49.861Z', 4),
(5, 'Wonder Woman 1984', 'A botched store robbery places Wonder Woman in a global battle against a powerful and mysterious ancient force that puts her powers in jeopardy.', 'http://res.cloudinary.com/dnozx04tw/image/upload/v1617795506/qr7y2auycqte03wmtaox.jpg', 'http://res.cloudinary.com/dnozx04tw/image/upload/v1617795507/axmfboagfsznxa7me0mq.jpg', '2h 41m', '2021-04-07T11:36:16.977Z', 7),
(6, 'Skylines', 'When a virus threatens to turn the now earth-dwelling friendly alien hybrids against humans, Captain Rose Corley must lead a team of elite mercenaries on a mission to the alien world in order to save what\'s left of humanity.', 'https://res.cloudinary.com/dnozx04tw/image/upload/v1617795691/uoowz5zvwi4wck003aqj.jpg', 'https://res.cloudinary.com/dnozx04tw/image/upload/v1617798095/3ombg55JQiIpoPnXYb2oYdr6DtP_nq8e3a.jpg', '1h 53m\r\n', '2021-04-07T13:15:45.535Z', 1),
(7, 'Outside the Wire', 'In the near future, a drone pilot is sent into a deadly militarized zone and must work with an android officer to locate a doomsday device.', 'http://res.cloudinary.com/dnozx04tw/image/upload/v1617796009/asv4domlcd5ezanqrnlw.jpg', 'http://res.cloudinary.com/dnozx04tw/image/upload/v1617796010/wfschxufkf9xylcinslr.jpg', '1h 54m', '2021-04-07T11:44:15.046Z', 3);

-- --------------------------------------------------------

--
-- Structure de la table `programmes`
--

CREATE TABLE `programmes` (
  `id_program` int(11) NOT NULL,
  `id_movie` int(11) NOT NULL,
  `id_salle` int(11) NOT NULL,
  `date` varchar(100) NOT NULL,
  `time_program` varchar(100) NOT NULL,
  `price` int(20) NOT NULL,
  `price_vip` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `programmes`
--

INSERT INTO `programmes` (`id_program`, `id_movie`, `id_salle`, `date`, `time_program`, `price`, `price_vip`) VALUES
(1, 1, 3, '2021-05-12', '18:00', 100, 200),
(2, 2, 2, '2021-05-14', '17:00', 120, 210),
(3, 3, 3, '2021-04-22', '22:00', 50, 100),
(4, 4, 1, '2021-04-29', '16:50', 50, 100),
(6, 6, 1, '2021-04-20', '11:20', 100, 200);

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id_reservation` int(11) NOT NULL,
  `id_program` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `place_choisir` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id_reservation`, `id_program`, `id_client`, `place_choisir`) VALUES
(1, 2, 4, '3-7-99-165');

-- --------------------------------------------------------

--
-- Structure de la table `salles`
--

CREATE TABLE `salles` (
  `id_salle` int(11) NOT NULL,
  `lib_salle` varchar(200) NOT NULL,
  `nombre` int(20) NOT NULL,
  `place_vip` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `salles`
--

INSERT INTO `salles` (`id_salle`, `lib_salle`, `nombre`, `place_vip`) VALUES
(1, 'Future Privilège', 286, '155-156-157-157-158-159-160-161-162-163-164-165-166-167-168-169-170-171-179-180-181-182-183-184-191-192-193-194-195-196-197-129-103-77-53-29-5-31-57-82-106-132-235-260-240-265-147-123-99-73-47-21-45-69-94-120-145-210-215-261-263-264-212-213'),
(2, 'Future Ivoire', 286, '155-156-157-157-158-159-160-161-162-163-164-165-166-167-168-169-170-171-179-180-181-182-183-184-191-192-193-194-195-196-197-129-103-77-53-29-5-31-57-82-106-132-235-260-240-265-147-123-99-73-47-21-45-69-94-120-145-210-215-261-263-264-212-213'),
(3, 'Future Prima', 286, '155-156-157-157-158-159-160-161-162-163-164-165-166-167-168-169-170-171-179-180-181-182-183-184-191-192-193-194-195-196-197-129-103-77-53-29-5-31-57-82-106-132-235-260-240-265-147-123-99-73-47-21-45-69-94-120-145-210-215-261-263-264-143-117-91-65-39-38-134-110-86-62-88-112-136-89-115-141-138-139');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`) VALUES
(1, 'admin', 'admin');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`);

--
-- Index pour la table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id_contact`);

--
-- Index pour la table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id_genre`);

--
-- Index pour la table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id_movie`);

--
-- Index pour la table `programmes`
--
ALTER TABLE `programmes`
  ADD PRIMARY KEY (`id_program`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id_reservation`);

--
-- Index pour la table `salles`
--
ALTER TABLE `salles`
  ADD PRIMARY KEY (`id_salle`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id_contact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `genres`
--
ALTER TABLE `genres`
  MODIFY `id_genre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `movies`
--
ALTER TABLE `movies`
  MODIFY `id_movie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `programmes`
--
ALTER TABLE `programmes`
  MODIFY `id_program` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id_reservation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `salles`
--
ALTER TABLE `salles`
  MODIFY `id_salle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
