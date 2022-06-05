<?php

	session_start();

	include 'connection.php';

	$user_status = "online";
	$users_list = [];
	$value_list = "('" . $_SESSION['user_id'] . "',";

	$friends = $conn->prepare("SELECT friends FROM Users WHERE id=?");
	$friends->bind_param("s", $_SESSION['user_id']);
	$friends->execute();
	$friends = $friends->get_result();
	$friends = $friends->fetch_assoc()["friends"];

	if($friends !== NULL) {
		$friends = json_decode($friends);
		foreach ($friends as $key => $value) {
			if(($key + 1) === count($friends)) {
				$value_list .= "'$value')";
			} else {
				$value_list .= "'$value',";
			}
		};
		$users = $conn->prepare("SELECT name, bg, status FROM Users WHERE  id NOT IN " . $value_list . "ORDER BY name");
	} else {
		$users = $conn->prepare("SELECT name, bg, status FROM Users WHERE id NOT IN ('?') ORDER BY name");
		$value_list = "('" . $_SESSION["user_id"] . "')";
		$users->bind_param("s", $value_list);
	}

	$users->execute();
	$users = $users->get_result();

	if($users->num_rows > 0) {
		while($row = $users->fetch_assoc()) {
			array_push($users_list, $row);
		}
		echo(json_encode($users_list));
	} else {
		die("! No data found");
	}

?>