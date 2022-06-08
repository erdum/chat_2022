const updateUserPresence = (item, data) => {
	const id = item.id.substr(0, item.id.length - 3);
	const now = Date.now();
	if (id in data) {
		const { lastSeen } = data[id];
		const statusElem = item.querySelector("div > div.user_data p");
		if ((now - lastSeen) / 1000 >= 15) {
			statusElem.textContent = "offline";
		} else {
			statusElem.textContent = "online";
		}
	}
};

export default updateUserPresence;
