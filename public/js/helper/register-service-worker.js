const resgisterServiceWorker = () => {
	if ("serviceWorker" in navigator) {
		try {
			navigator.serviceWorker
				.register("/sw.js", {
					scope: "/",
				})
				.then(() => Notification.requestPermission());
		} catch (error) {
			console.log(`serviceWorker installation failed with ${error}`);
		}
	}
};

export default resgisterServiceWorker;
