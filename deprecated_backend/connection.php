<?php

	$host = "localhost";
	$name = "root";
	$pass = "";
	$db = "chat";

	if(!function_exists("clear_session")) {
		function clear_session() {
			$sess_params = session_get_cookie_params();
			setcookie("PHPSESSID", null, -1, $sess_params["path"], $sess_params["domain"]);
			session_unset();
			session_destroy();
		};
	}

	$conn = new mysqli($host, $name, $pass, $db);

	if($conn->connect_error) {
		clear_session();
		die("Server down try again!");
	}

?>