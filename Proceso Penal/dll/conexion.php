<?php
$host = 'localhost';
$bd ='ProcesoPenal';
$user = 'postgres';

$conexion = pg_connect("host=$host dbname=$bd user=$user");

$query = ("INSERT INTO personas(apellidos,nombres,cedula) VALUES ('$_REQUEST[apellidos]', '$_REQUEST[nombres]', '$_REQUEST[cedula]')");

$consulta = pg_query($conexion, $query);
pg_close();

echo "Conexion Establecida";
?>