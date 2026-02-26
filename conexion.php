<?php
$servername = "localhost";
$username   = "u782069773_ARContacto1920";
$password   = "ths>?U9m;P9";
$database   = "u782069773_ARContacto";

$conexion = new mysqli($servername, $username, $password, $database);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>
