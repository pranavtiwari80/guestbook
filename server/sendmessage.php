<?php
error_reporting(0);
include_once("config.php");
$ip_address = get_ip_address();
$ip = mysqli_real_escape_string($conn, $ip_address);  
// echo "insert into users set guid='$ip_address'";
// mysqli_query($conn, "insert into users set guid='$ip_address'");
$datetime = date("Y-m-d H:i:s");
$message = mysqli_real_escape_string($conn, strip_tags($_POST["message"]));  
$parent_message_id = mysqli_real_escape_string($conn, $_POST["message_id_send_response"]);  
mysqli_query($conn, "insert into messages set message_from='$ip', message='$message', parent_message_id='$parent_message_id', post_date = '$datetime' ");
echo 1;
?>