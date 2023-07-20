// IMPORTS
import {
	toggleTabBar,
	toggleActionBar,
	toggleFeed,
	toggleChat,
} from "../ui-state/ui-state-togglers.js";

import {
	setDataFeedHeading,
	setTabBarColor,
	changeDataFeed,
	toggleSearchBar,
	startUI,
	resetUI
} from "../ui-state/ui-setters.js";
import { getCurrProfile } from "../data/firestore.js";

let oldHash = location.hash;
const body = document.querySelector(".bar_group");

setInterval(() => {
	if (oldHash === "#msg" && location.hash !== "#msg") {
		resetUI();
	}
	if (oldHash !== location.hash) {
		handleHashState(location.hash);
	}
	oldHash = location.hash;
}, 0);

const handleHashState = (value) => {
	if (value !== "#scrolled") {
		body.scrollTop = 0;
	}
	toggleSearchBar(false);
	switch (value) {
		case "#au":
			setDataFeedHeading("All Users");
			setTabBarColor(0);
			changeDataFeed(0);
			break;
		case "#req":
			setDataFeedHeading("Request's");
			setTabBarColor(1);
			changeDataFeed(1);
			break;
		case "#fr":
			setDataFeedHeading("Friends");
			setTabBarColor(2);
			changeDataFeed(2);
			break;
		case "#msg":
			toggleTabBar();
			toggleActionBar();
			toggleFeed();
			toggleChat();
			break;
		case "#search":
			toggleSearchBar(true);
			break;
		default:
			break;
	}
};
