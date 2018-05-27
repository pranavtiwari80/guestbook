<?php
error_reporting(0);
include_once("config.php");
$ip_address = get_ip_address();
$query = "SELECT * FROM messages where message_from='$ip_address'  order by id desc";  
$result = mysqli_query($conn, $query);  
$num_rows = mysqli_num_rows($result);
if($num_rows>0)
{
	while($row = mysqli_fetch_assoc($result))
	{
		$val[] = $row;
	}
	echo json_encode($val);
}
else
{
	echo 0;
}

?>