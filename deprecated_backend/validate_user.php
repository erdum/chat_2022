<?php

	session_set_cookie_params(0, "/chat/");

	session_start();

	include "connection.php";
	include 'get_browser.php';

	$user_name = $_POST['name'];
	$user_pass = $_POST['pass'];
	$user_color = $_POST['color'];
	$user_agent = $_POST['viewport'] . "," . getBrowser()["name"] . "," . getBrowser()["version"] . "," . getBrowser()["platform"];
	$user_status = "online";

	function set_session() {
		global $conn, $user_name, $user_pass;
		$get_user_id = $conn->prepare("SELECT id FROM Users WHERE name=? AND pass=?");
		$get_user_id->bind_param("ss", $user_name, $user_pass);
		$get_user_id->execute();
		$get_user_id = $get_user_id->get_result();
		$get_user_id = $get_user_id->fetch_assoc();
		$_SESSION['user_id'] = $get_user_id["id"];
		session_regenerate_id();

	};

	function handle_login($bg, $user_name) {
		global $conn, $user_agent, $user_status;
		$update_user_data = $conn->prepare("UPDATE Users SET agent=?, status=? WHERE id=?");
		$update_user_data->bind_param("sss", $user_agent, $user_status, $_SESSION['user_id']);
		if($update_user_data->execute()) {
			http_response_code(201);
			echo($bg . $user_name);
			set_session();
		} else {
			clear_session();
			http_response_code(200);
			echo("Signin failed try again!");
		}
	};

	function handle_register() {
		global $conn, $user_name, $user_pass, $user_color, $user_agent, $user_status;
		$create_user = $conn->prepare("INSERT INTO Users (name, pass, bg, agent, status) VALUES (?, ?, ?, ?, ?)");
		$create_user->bind_param("sssss", $user_name, $user_pass, $user_color, $user_agent, $user_status);

		if($user_name && $user_pass) {
			if(false) {
				set_session();
				http_response_code(201);
			} else {
				clear_session();
				http_response_code(200);
				echo("Signup failed try again!");
			}
		} else {
				clear_session();
				http_response_code(400);
				echo("Request data is empty");
		}

	};

	if(isset($_COOKIE['PHPSESSID']) && isset($_SESSION['user_id'])) {
		$valid_user_agent = $conn->prepare("SELECT name, pass, bg, agent FROM Users WHERE id=?");
		$valid_user_agent->bind_param("s", $_SESSION['user_id']);
		$valid_user_agent->execute();
		$valid_user_agent = $valid_user_agent->get_result();
		$valid_user_agent = $valid_user_agent->fetch_assoc();
		if($valid_user_agent["agent"] === $user_agent) {
			$user_name = $valid_user_agent["name"];
			$user_pass = $valid_user_agent["pass"];
			handle_login($valid_user_agent["bg"], $user_name);
		} else {
			clear_session();
		}
	} else if($user_name != "1234") {
		$valid_username = $conn->prepare("SELECT * FROM Users WHERE name=? AND pass!=?");
		$valid_username->bind_param("ss", $user_name, $user_pass);
		$valid_username->execute();
		$valid_username = $valid_username->get_result();
		$valid_username = $valid_username->num_rows;

		$user_exist = $conn->prepare("SELECT * FROM Users WHERE name=? AND pass=?");
		$user_exist->bind_param("ss", $user_name, $user_pass);
		$user_exist->execute();
		$user_exist = $user_exist->get_result();
		$user_last_data = $user_exist->fetch_assoc();
		$user_exist = $user_exist->num_rows;

		if($valid_username != 0) {
			clear_session();
			http_response_code(200);
			echo("Username already taken\nor\nwrong password");
		} else if($user_exist != 0) {
			handle_login($user_last_data["bg"], $user_last_data["name"]);
		} else {
			handle_register();
		}
	} else {
		clear_session();
	}

	$conn->close();

?>