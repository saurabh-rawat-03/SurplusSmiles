<?php
$host="sql210.ezyro.com";
$user="ezyro_38329855";
$pass="412879bbc11408b";
$db="ezyro_38329855_surplussmiles";

$conn = new mysqli($host, $user, $pass, $db);
if($conn -> connect_error){
    echo "Failed to Connect".$conn->connect_error;
}

?>