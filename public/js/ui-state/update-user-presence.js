const updateUserPresence = (item, data, lastseen = false) => {
	const id = item.id.substr(0, item.id.length - 3);
	const now = Date.now();
	if (id in data) {
		const { lastSeen } = data[id];
		const lastDate = new Date(lastSeen);
		const statusElem = item.querySelector("div > div.user_data p");
		if ((now - lastSeen) / 1000 >= 15) {
			if (lastseen) {
				statusElem.textContent = `${String(lastDate.getHours()).padStart(2, "0")}:${String(lastDate.getMinutes()).padStart(2, "0")} ${lastDate.toLocaleString("default", { month: "short", day: "2-digit" })}`;
			} else {
				statusElem.textContent = "offline";
			}
		} else {
			statusElem.textContent = "online";
		}
	}
};

export default updateUserPresence;
