import subscribeNotification from "./subscribe-notification.js";

const resgisterServiceWorker = async () => {
	if ("serviceWorker" in navigator) {
		try {
			const resgistration = await navigator.serviceWorker.register(
				"/sw.js",
				{
					scope: "/"
				}
			);

			if (resgistration.installing) {
				console.log("Service worker installing");
			} else if (resgistration.waiting) {
				console.log("Service worker installed");
			} else if (resgistration.active) {
				console.log("Service worker active");
				subscribeNotification();
			}
		} catch (error) {
			console.log(
				`serviceWorker installation failed with ${error}`
			);
		}
	}
};

export default resgisterServiceWorker;
