<?php
error_reporting(0);
include_once("config.php");
$query = "SELECT id, message, if(LENGTH(message)>25,concat(SUBSTRING( message, 1, 24 ), ' ..'),message) as submessage, LENGTH(message) FROM `messages` order by rand() Limit 150";  
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