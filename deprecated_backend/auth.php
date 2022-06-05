<?php

	session_start();

	include "connection.php";
	include "get_browser.php";

	$agent = $_GET["viewport"] . "," . getBrowser()["name"] . "," . getBrowser()["version"] . "," . getBrowser()["platform"];

	if(isset($_SESSION['user_id']) && isset($_COOKIE['PHPSESSID'])) {
		$user_data = $conn->prepare("SELECT agent FROM Users WHERE id=?");
		$user_data->bind_param("s", $_SESSION['user_id']);
		$user_data->execute();
		$user_data = $user_data->get_result();
		$user_data = $user_data->fetch_assoc()["agent"];
		if($user_data != $agent) {
			clear_session();
			http_response_code(401);
			die("We detected device change from your account\nfor security reason you have to login again");
		}
	} else {
		clear_session();
		http_response_code(401);
		die("Your sesssion ID is lost\nfor security reason you have to login again");
	}

?>