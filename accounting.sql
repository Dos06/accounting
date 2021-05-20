-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 20 2021 г., 21:22
-- Версия сервера: 10.4.14-MariaDB
-- Версия PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `accounting`
--

-- --------------------------------------------------------

--
-- Структура таблицы `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `employees`
--

INSERT INTO `employees` (`id`, `name`) VALUES
(1, 'Ivanov'),
(2, 'Petrov'),
(3, '1'),
(4, '11'),
(5, '111'),
(6, '1111'),
(7, '11111'),
(8, '111111'),
(9, '1111111'),
(10, '11111111'),
(11, '111111111'),
(17, 'Smirnov');

-- --------------------------------------------------------

--
-- Структура таблицы `employees_items`
--

CREATE TABLE `employees_items` (
  `employee_id` bigint(20) NOT NULL,
  `items_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `employees_items`
--

INSERT INTO `employees_items` (`employee_id`, `items_id`) VALUES
(1, 1),
(17, 2),
(17, 3),
(17, 4),
(17, 1),
(11, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--

CREATE TABLE `items` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id`, `name`, `price`) VALUES
(1, 'Mouse', 5000),
(2, 'Laptop', 100000),
(3, 'Keyboard', 1000),
(4, 'test', 1231);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `employees_items`
--
ALTER TABLE `employees_items`
  ADD KEY `FK7ajucwn38r99ewrdau3fvf9i1` (`items_id`),
  ADD KEY `FKthrl74u8md0mvqpks5it1x4a8` (`employee_id`);

--
-- Индексы таблицы `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `employees_items`
--
ALTER TABLE `employees_items`
  ADD CONSTRAINT `FK7ajucwn38r99ewrdau3fvf9i1` FOREIGN KEY (`items_id`) REFERENCES `items` (`id`),
  ADD CONSTRAINT `FKthrl74u8md0mvqpks5it1x4a8` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
