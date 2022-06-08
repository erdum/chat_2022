import randomColor from "../helper/random-color.js";
import { startUI, signinBtnLoader, feeds } from "../ui-state/ui-setters.js";
import { toggleForm } from "../ui-state/ui-state-togglers.js";
import {
	fetchUserColor,
	createUser,
	listenUsers,
	listenRequests,
	listenFriends,
	getProfile,
	getProfilesByIds,
	profilesToRenderList
} from "../data/firestore.js";
import { listenPresenceChange } from "../data/realtime-database.js";
import renderAllUsersFeed from "../ui-state/render-au-feed.js";
import renderRequestsFeed from "../ui-state/render-req-feed.js";
import renderFriendsFeed from "../ui-state/render-friends-feed.js";

const joinHandler = async ({ displayName, uid, email }) => {
	const userHasColor = await fetchUserColor(uid);
	const generatedColor = randomColor();

	if (userHasColor == null) {
		await createUser(uid, {
			color: generatedColor,
			name: displayName,
			email,
			requests: [],
			friends: [],
		});
	}
	startUI(displayName, userHasColor ?? generatedColor);
	signinBtnLoader(false);
	toggleForm();

	const unsubUsersListener = listenUsers(users => renderAllUsersFeed(users));

	const unsubRequestsListener = listenRequests(async (requests) => {
		if (requests.length > 0) {
			let users = await getProfilesByIds(requests);
			users = await profilesToRenderList(users);
			renderRequestsFeed(users);
		} else {
			renderRequestsFeed([]);
		}
	});

	const unsubFriendsListener = listenFriends(async (friends) => {
		if (friends.length > 0) {
			let users = await getProfilesByIds(friends);
			users = await profilesToRenderList(users);
			renderFriendsFeed(users);
		} else {
			renderFriendsFeed([]);
		}
	});

	const unsubPresenceListener = listenPresenceChange((data) => {
		const allUsersList = Array.from(feeds.allUsersFeed.children);
		const now = Date.now();
		allUsersList.map((item) => {
			const uid = item.id.substr(0, item.id.length - 3);
			if (uid in data) {
				const { lastSeen } = data[uid];
				const statusElem = item.querySelector("div > div.user_data p");
				if (((now - lastSeen) / 1000) > 60) {
					statusElem.textContent = "offline";
				} else {
					statusElem.textContent = "online";
				}
			}
		});
	});
};

export default joinHandler;
