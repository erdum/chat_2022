<?php

	header("Content-Type: text/event-stream");
	header('Cache-Control: no-cache');

	while(1) {
		echo("data: testing...\n\n");

		ob_end_flush();
		flush();
		sleep(2);
	}

	// We cannot implement server sent events or long polling or even web sockets in PHP for production because it will going to be a disaster. Now at this point I am changing the backend language for this application to Node.js.

?>