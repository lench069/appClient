-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 10-03-2023 a las 23:20:20
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cliente_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `titulo`, `imagen`, `descripcion`) VALUES
(1, 'Caldo / Soup', 'imagenes/1678336147.jpg', 'Deliciosas sopas chinas'),
(2, 'Entradas', 'imagenes/1678336227.jpg', 'Entradas para acompañar'),
(3, 'Arroz / Rice', 'imagenes/1678424690.jpg', 'Delicioso arroz'),
(4, 'Tallarines / Noodle', 'imagenes/1678424758.jpg', 'Deliciosos tallatines');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `identificacion` varchar(50) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `pass` varchar(20) NOT NULL,
  `uuid` varchar(100) NOT NULL,
  `activo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `identificacion`, `nombre`, `telefono`, `correo`, `direccion`, `pass`, `uuid`, `activo`) VALUES
(1, '0604262956', 'Lenin', '0987306109', 'lcvelastegui@gmail.com', 'la paz', '123', '0aed5623-8d55-42d3-af04-b1fa8010a511', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE IF NOT EXISTS `pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_id` int(11) DEFAULT '0',
  `fecha` timestamp NULL DEFAULT NULL,
  `usuario_id` int(11) DEFAULT '0',
  `estado` int(1) DEFAULT '0',
  `subtotal` float NOT NULL,
  `iva` float NOT NULL,
  `total` float NOT NULL,
  `mesa` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `cliente_id`, `fecha`, `usuario_id`, `estado`, `subtotal`, `iva`, `total`, `mesa`) VALUES
(1, 1, '2023-03-08 16:52:50', 1, 1, 12, 1.44, 13.44, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_detalle`
--

DROP TABLE IF EXISTS `pedidos_detalle`;
CREATE TABLE IF NOT EXISTS `pedidos_detalle` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `producto_id` int(11) DEFAULT '0',
  `pedido_id` int(11) DEFAULT '0',
  `cantidad` int(11) DEFAULT '0',
  `precio` decimal(18,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `relacion_pedido` (`pedido_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos_detalle`
--

INSERT INTO `pedidos_detalle` (`id`, `producto_id`, `pedido_id`, `cantidad`, `precio`) VALUES
(1, 19, 1, 2, '6.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `codigo` varchar(20) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT '100',
  `precio` decimal(18,2) DEFAULT '0.00',
  `activo` int(1) DEFAULT '1',
  `imagen` text,
  `categoria` int(11) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `codigo`, `nombre`, `stock`, `precio`, `activo`, `imagen`, `categoria`, `descripcion`) VALUES
(14, '001', 'Consome solo', 100, '1.50', 1, 'imagenes/1678336489.jpg', 1, 'Delicioso cosome'),
(15, '002', 'Consome a la reina ', 100, '2.00', 1, 'imagenes/1678336556.jpg', 1, 'Consome'),
(16, '003', 'Consome de legumbres', 100, '3.00', 1, 'imagenes/1678337345.jpg', 1, 'prueba'),
(17, '004', 'Huevo frito', 100, '0.60', 1, 'imagenes/1678337373.jpg', 2, 'prueba'),
(18, '005', 'Chaulafan especial', 100, '5.00', 1, 'imagenes/1678337433.jpg', 3, 'Chaulafan'),
(19, '006', 'Tallarin saltado especial', 100, '6.00', 1, 'imagenes/1678425699.jpg', 1, 'tallarin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) DEFAULT NULL,
  `clave` text,
  `nombre` varchar(150) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `activo` int(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `clave`, `nombre`, `telefono`, `correo`, `activo`) VALUES
(1, 'admin', 'admin', 'Administrador', '0000000', 'micorreo@dominio.com', 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidos_detalle`
--
ALTER TABLE `pedidos_detalle`
  ADD CONSTRAINT `relacion_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
