import subscribeNotification from "./subscribe-notification.js";

const resgisterServiceWorker = () => {
	if ("serviceWorker" in navigator) {
		try {
			navigator.serviceWorker
				.register("/sw.js", {
					scope: "/",
				})
				.then(subscribeNotification);
		} catch (error) {
			console.log(`serviceWorker installation failed with ${error}`);
		}
	}
};

export default resgisterServiceWorker;
