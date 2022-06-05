import { feeds } from "./ui-setters.js";
import createFeedItem from "../components/feed-item.js";

const renderRequestsFeed = (list) => {
	feeds.requestsFeed.innerHTML = "";

	if (list.length === 0) {
		feeds.requestsFeed.innerHTML = "<h1>You have no requests</h1>";
	} else {
		list.forEach((item, index) => {
			createFeedItem(`${item.key}-req`, feeds.requestsFeed, {
				...item,
				key: `${item.key}-req`,
				actionIcon: "fa-user-check"
			});
		});
	}
};

export default renderRequestsFeed;
