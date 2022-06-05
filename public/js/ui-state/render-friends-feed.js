import { feeds } from "./ui-setters.js";
import createFeedItem from "../components/feed-item.js";

const renderFriendsFeed = (list) => {
	feeds.friendsFeed.innerHTML = "";

	if (list.length === 0) {
		feeds.friendsFeed.innerHTML = "<h1>You have no friends</h1>";
	} else {
		list.forEach((item, index) => {
			createFeedItem(`${item.key}-fr`, feeds.friendsFeed, {
				...item,
				key: `${item.key}-fr`,
				actionIcon: "fa-user-minus"
			});
		});
	}
};

export default renderFriendsFeed;
