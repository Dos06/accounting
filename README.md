## Get Started
1. `git clone https://github.com/Dos06/accounting`
2. `cd src/main/frontend`
3. `npm install`
4. Run in the DB Query Console:
   `CREATE DATABASE accounting CHARACTER SET utf8 COLLATE utf8_general_ci;`
   
    CREATE TABLE `employees` (
    `id` bigint(20) NOT NULL,
    `name` varchar(255) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


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

    CREATE TABLE `items` (
    `id` bigint(20) NOT NULL,
    `name` varchar(255) DEFAULT NULL,
    `price` int(11) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    
    INSERT INTO `items` (`id`, `name`, `price`) VALUES
    (1, 'Mouse', 5000),
    (2, 'Laptop', 100000),
    (3, 'Keyboard', 1000),
    (4, 'test', 1231);

    -- --------------------------------------------------------

    CREATE TABLE `employees_items` (
    `employee_id` bigint(20) NOT NULL,
    `items_id` bigint(20) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    
    INSERT INTO `employees_items` (`employee_id`, `items_id`) VALUES
    (1, 1),
    (17, 2),
    (17, 3),
    (17, 4),
    (17, 1),
    (11, 4);

5. Run the application
