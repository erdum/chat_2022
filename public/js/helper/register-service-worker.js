const resgisterServiceWorker = async () => {
	if ("serviceWorker" in navigator) {
		try {
			const worker = await navigator.serviceWorker.register("/sw.js", {
				scope: "/",
			});

			AppNotification.subscribeNotification(worker);
		} catch (error) {
			console.log(`serviceWorker installation failed with ${error}`);
		}
	}
};

const AppNotification = (() => {
	let serviceWorker;

	const subscribeNotification = (worker) => {
		Notification.requestPermission();
		serviceWorker = worker;
	};

	const renderNotification = (username, userBg, msg) => {
		serviceWorker.showNotification(username, {
			body: msg,
			icon: `https://ui-avatars.com/api/?name=${username.replace(
				/\s/g,
				"+"
			)}&background=${userBg}&color=ffffff&format=png`,
			requireInteraction: false,
		});
	};

	return {
		subscribeNotification,
		renderNotification,
	};
})();

export default resgisterServiceWorker;

export { AppNotification };
