import app from "./firebase.js";
import { auth } from "../app.js";
import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"

const rtb = getDatabase();

const setUserPresence = (uid) => {
	const now = Date.now();
	set(ref(rtb, "users/" + uid), {
		lastSeen: now,
		typing: false
	});
};

const updatePresence = (uid, isUserTyping = false) => {
	const now = Date.now();
	update(ref(rtb, "users/" + uid), {
		lastSeen: now,
		typing: isUserTyping
	});
};

export { setUserPresence, updatePresence };
