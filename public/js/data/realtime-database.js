import app from "./firebase.js";
import { auth } from "../app.js";
import {
	getDatabase,
	ref,
	set,
	update,
	onValue,
	off
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

const rtb = getDatabase();

const setUserPresence = (uid) => {
	const now = Date.now();
	set(ref(rtb, "users/" + uid), {
		lastSeen: now,
		typing: false,
	});
};

const updatePresence = (uid, isUserTyping = null) => {
	const payload = {};
	payload.lastSeen = Date.now();

	if (isUserTyping != null) payload.typing = isUserTyping;
	update(ref(rtb, "users/" + uid), payload);
};

const listenPresenceChange = (callback) => {
	return onValue(ref(rtb, "users/"), snapShot => {
		callback(snapShot.val());
	});
};

const listenUserPresence = (uid, callback) => {
	return onValue(ref(rtb, `users/${uid}`), snapShot => {
		callback(snapShot.val());
	});
};

export {
	setUserPresence,
	updatePresence,
	listenPresenceChange,
	listenUserPresence
};
