// IMPORTS
import {
	createEmptyMsg,
	populateMsg,
	createEmptyFeedItem,
	populateFeedItem,
} from "./create-comps.js";

for (i = 0; i < 10; i++) {
	createEmptyMsg(i, chat);
	populateMsg(
		{
			key: i,
			text: "testing...",
			time: "16:26",
		},
		true
	);
}

for (i = 0; i < 10; i++) {
	createEmptyFeedItem(i + "au", dataFeeds[0]);
	populateFeedItem({
		iconSrc: "ea.png",
		actionIcon: "fa-user-plus",
		userName: "Erdum Adnan",
		userStatus: "online",
		key: i + "au",
	});
}
for (i = 0; i < 10; i++) {
	createEmptyFeedItem(i + "req", dataFeeds[1]);
	populateFeedItem({
		iconSrc: "ea.png",
		actionIcon: "fas fa-bell",
		userName: "Erdum Adnan",
		userStatus: "online",
		key: i + "req",
	});
}
for (i = 0; i < 10; i++) {
	createEmptyFeedItem(i + "fr", dataFeeds[2]);
	populateFeedItem({
		iconSrc: "ea.png",
		actionIcon: "fas fa-user-minus",
		userName: "Erdum Adnan",
		userStatus: "offline",
		key: i + "fr",
	});
}
