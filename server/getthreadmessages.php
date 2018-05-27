<?php
error_reporting(E_ALL);
include_once("config.php");
$a =0;
function messagethreads($parent = 0 ,$level=0) {
		global $conn;
		global $a;
		$query = "SELECT * FROM messages  WHERE parent_message_id = $parent";  
		$result = mysqli_query($conn, $query); 
		
			echo "<ul>"; 
			$cnt = 0;
			while($row = mysqli_fetch_assoc($result))
			{
				$a++;
				$timeago=get_timeago(strtotime($row['post_date']));
				$data_whatever = $row["id"]."||::|".$row["message"];
				$ip_address = get_ip_address();
				
				if($row["message_from"]==$ip_address)
				{
					$img = "<img src='images/me.png' width='30' class='tooltip-test' title='Me'>"; 
				}
				else
				{
					$img = "<img src='images/anonymous1.png' width='26' class='tooltip-test' title='Anonymous'>";	
				}
				echo "<li><span class='image-user'>$img</span><a href='#' data-toggle='modal' data-target='#sendMessageModal'  data-whatever='".$data_whatever."'>". $row['message']. "</a><span class='posted'>Posted ".$timeago."</span></li>";
	            messagethreads($row['id'] ,$level +1);
			}
			echo "</ul>";
		
}
function getResult($parent){
		global $conn;
		$query = "SELECT * FROM messages  WHERE parent_message_id = $parent";  
		$result = mysqli_query($conn, $query);
		$rowcount=mysqli_num_rows($result);
		return $rowcount;
}
function getMessage($id){
		global $conn;
		$query = "SELECT * FROM messages  WHERE id = $id";  
		$result = mysqli_query($conn, $query);
		$row = mysqli_fetch_assoc($result);
		$message= $row["message"];
		return $message;
}
$message_id = mysqli_real_escape_string($conn, $_POST["message_id"]);  
function get_timeago( $ptime )
{
    $estimate_time = time() - $ptime;

    if( $estimate_time < 1 )
    {
        return 'less than 1 second ago';
    }

    $condition = array( 
                12 * 30 * 24 * 60 * 60  =>  'year',
                30 * 24 * 60 * 60       =>  'month',
                24 * 60 * 60            =>  'day',
                60 * 60                 =>  'hour',
                60                      =>  'minute',
                1                       =>  'second'
    );

    foreach( $condition as $secs => $str )
    {
        $d = $estimate_time / $secs;

        if( $d >= 1 )
        {
            $r = round( $d );
            return 'about ' . $r . ' ' . $str . ( $r > 1 ? 's' : '' ) . ' ago';
        }
    }
}
//$message_id = 26;
//$result = messagethreads($message_id);
//$result = messagethreads(16);
$count = getResult($message_id);
if($count>0)
{
	$result = messagethreads($message_id);
}
else
{
	$message = getMessage($message_id);
	$data_whatever = $message_id."||::|".$message;
	echo "<ul>";
	echo "<li>No Conversation Found</li>";
	//echo "&nbsp;&nbsp;";
	//echo "<div><a href='#'>Click Here to add response</a></div>";
	//echo "<li><a href='#' data-toggle='modal' data-target='#sendMessageModal'  data-whatever='".$data_whatever."'>Click Here to send response</a></li>";
	echo "</ul>";
}

?>
