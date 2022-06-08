import { feeds } from "./ui-setters.js";
import createFeedItem from "../components/feed-item.js";

const renderAllUsersFeed = (list) => {
	feeds.allUsersFeed.innerHTML = "";
	
	if (list.length === 0) {
		feeds.allUsersFeed.innerHTML = "<h1>Currently no users found on the network</h1>";
	} else {
		list.forEach((item, index) => {
			createFeedItem(`${item.key}-au`, feeds.allUsersFeed, {
				...item,
				key: `${item.key}-au`,
				actionIcon: "fa-user-plus",
				userStatus: "online"
			});
		});
	}
};

export default renderAllUsersFeed;
