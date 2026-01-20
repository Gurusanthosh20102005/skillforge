-- Drop tables if they exist (Order matters due to foreign keys)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `QuizResults`;
DROP TABLE IF EXISTS `Quizzes`;
DROP TABLE IF EXISTS `Contents`;
DROP TABLE IF EXISTS `Enrollments`;
DROP TABLE IF EXISTS `Courses`;
DROP TABLE IF EXISTS `Users`;
SET FOREIGN_KEY_CHECKS = 1;

-- Create Users Table
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','instructor','admin') DEFAULT 'student',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Courses Table
CREATE TABLE `Courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `difficultyLevel` enum('Beginner','Intermediate','Advanced') DEFAULT 'Beginner',
  `instructorId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `instructorId` (`instructorId`),
  CONSTRAINT `Courses_ibfk_1` FOREIGN KEY (`instructorId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Contents Table
CREATE TABLE `Contents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` enum('video','pdf','link') NOT NULL,
  `url` varchar(255) NOT NULL,
  `courseId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `Contents_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `Courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Enrollments Table
CREATE TABLE `Enrollments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentId` int NOT NULL,
  `courseId` int NOT NULL,
  `progress` float DEFAULT '0',
  `completed` tinyint(1) DEFAULT '0',
  `currentScore` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `Enrollments_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Enrollments_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `Courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Quizzes Table
CREATE TABLE `Quizzes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topic` varchar(255) NOT NULL,
  `questions` json NOT NULL,
  `courseId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `Quizzes_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `Courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create QuizResults Table
CREATE TABLE `QuizResults` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentId` int NOT NULL,
  `quizId` int NOT NULL,
  `score` int NOT NULL,
  `totalQuestions` int NOT NULL,
  `answers` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `quizId` (`quizId`),
  CONSTRAINT `QuizResults_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `QuizResults_ibfk_2` FOREIGN KEY (`quizId`) REFERENCES `Quizzes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
