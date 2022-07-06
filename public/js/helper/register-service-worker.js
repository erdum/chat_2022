const resgisterServiceWorker = async () => {
	if ("serviceWorker" in navigator) {
		try {
			const resgistration = await navigator.serviceWorker.register(
				"/sw.js"
			);

			if (registration.installing) {
				console.log("Service worker installing");
			} else if (registration.waiting) {
				console.log("Service worker installed");
			} else if (registration.active) {
				console.log("Service worker active");
			}
		} catch (error) {
			console.log(
				`serviceWorker installation failed with error ${error}`
			);
		}
	}
};

export default resgisterServiceWorker;
