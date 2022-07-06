const subscribeNotification = () => {
	console.log("callled");
	Notification.requestPermission();
	navigator.serviceWorker.ready.then((worker) => {
		console.log(worker);
	});
};

export default subscribeNotification;
