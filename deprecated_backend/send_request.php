<?php

	include "auth.php";
	include "connection.php";

	$friend_id = $conn->prepare("SELECT id FROM Users WHERE name=?");
	$friend_id->bind_param("s", $_GET["name"]);
	$friend_id->execute();
	$friend_id = $friend_id->get_result();
	$friend_id = $friend_id->fetch_assoc()["id"];
	$friend_id = (string)$friend_id;

	$requests_list = $conn->prepare("SELECT requests FROM Users WHERE id=?");
	$requests_list->bind_param("s", $friend_id);
	$requests_list->execute();
	$requests_list = $requests_list->get_result();
	$requests_list = $requests_list->fetch_assoc()["requests"];
		

	if($requests_list === NULL) {
		$requests_list = [(string)$_SESSION["user_id"]];
		$requests_list = json_encode($requests_list);
	} else {
		$requests_list = json_decode($requests_list);
		array_push($requests_list, (string)$_SESSION["user_id"]);
		$requests_list = array_unique($requests_list);
		$requests_list = json_encode($requests_list);
	}


	$new_friends_list = $conn->prepare("UPDATE Users SET requests=? WHERE id=?");
	$new_friends_list->bind_param("ss", $requests_list, $friend_id);
	$new_friends_list = $new_friends_list->execute();

	if($new_friends_list) {
		http_response_code(200);
	} else {
		http_response_code(401);
		echo("Update failed!");
	}

?>