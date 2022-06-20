const newMsgNotification = (username, userBg, msg) => {
	new Notification(username, {
		"body": msg,
		"icon": `https://ui-avatars.com/api/?name=${username.replace(/\s/g, "+")}&background=${userBg}&color=ffffff&format=png`,
		"requireInteraction": false
	});
}

export {
	newMsgNotification
};
