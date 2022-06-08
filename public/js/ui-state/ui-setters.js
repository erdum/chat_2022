// IMPORTS
import {
	toggleForm,
	toggleBanner,
	toggleActionBar,
	toggleFeed,
	toggleTabBar,
	toggleChat
} from "./ui-state-togglers.js";
import removeAllEvents from "../helper/remove-events.js";
import { getCurrProfile } from "../data/firestore.js";

// --------------------------- DOM Elements ---------------------
const status = document.querySelector(".status");
const signinBtn = document.querySelector(".form_btn");
const userName = document.querySelector("#user_name");
const userPass = document.querySelector("#user_pass");
let popupText = document.querySelector(".popup > p");
const popupWrapper = document.querySelector(".popup_wrapper");
let popupOk = document.querySelector("#ok").parentElement;
let popupCancel = document.querySelector("#cancel").parentElement;
const tabBar = document.querySelector(".tab_bar");
const dataFeedHeading = document.querySelector(".data_feed_heading");
const dataFeeds = document.getElementsByClassName("data_feed");
const searchBar = document.querySelector("#search_bar");

const setStatusText = (text) => {
	status.children[1].textContent = text;
};

const setUserAvatar = (name, bg) => {
	status.childNodes[1].setAttribute(
		"src",
		`https://ui-avatars.com/api/?name=${name.replace(/\s/, "+")}&background=${bg}&color=ffffff`
	);
};

const signinBtnLoader = (state) => {
	if (state) {
		signinBtn.innerHTML =
			"<i class='fas fa-circle-notch' style='animation: rot 0.8s linear; animation-iteration-count: infinite;'></i>";
	} else {
		signinBtn.innerHTML = "Join";
	}
};

const startUI = (name, userColor) => {
	setStatusText(name);
	setUserAvatar(name, userColor);
	toggleBanner();
	toggleTabBar();
	toggleActionBar();
	toggleFeed();
};

const resetUI = async () => {
	const { name, color } = await getCurrProfile();
	setStatusText(name);
	setUserAvatar(name, color);
	toggleTabBar();
	toggleActionBar();
	toggleFeed();
	toggleChat();
};

const openChat = (name, userColor) => {
	setStatusText(name);
	setUserAvatar(name, userColor);
	location.hash = "#msg";
};

const togglePopup = (
	popupState,
	text = "",
	ok = null,
	cancel = null,
	okArgs = [],
	cancelArgs = []
) => {
	removeAllEvents(popupOk);
	removeAllEvents(popupCancel);
	if (popupState) {
		popupText.innerText = text;
		popupWrapper.style.display = "flex";
	} else {
		popupText.innerText = text;
		popupWrapper.style.display = "none";
	}

	if (ok === null) {
		popupOk = document.querySelector("#ok").parentElement;
		popupOk.addEventListener("click", () => {
			togglePopup(false);
		});
	} else {
		popupOk = document.querySelector("#ok").parentElement;
		popupOk.addEventListener("click", ok.bind(event, okArgs));
	}

	if (cancel === null) {
		popupCancel = document.querySelector("#cancel").parentElement;
		popupCancel.addEventListener("click", () => {
			togglePopup(false);
		});
	} else {
		popupCancel = document.querySelector("#cancel").parentElement;
		popupCancel.addEventListener("click", cancel.bind(cancelArgs));
	}
};

const setTabBarColor = (index) => {
	for (let i = 0; i < tabBar.children.length; i++) {
		tabBar.children[i].children[0].style.color = "black";
	}
	tabBar.children[index].children[0].style.color = "#ffffff";
};

const setDataFeedHeading = (text) => {
	dataFeedHeading.innerHTML = text;
};

const changeDataFeed = (index = 0) => {
	for (let i = 0; i < dataFeeds.length; i++) {
		dataFeeds[i].style.display = "none";
	}
	dataFeeds[index].style.display = "block";
};
changeDataFeed();

const toggleSearchBar = (state) => {
	if (state) {
		dataFeedHeading.style.display = "none";
		searchBar.style.display = "block";
		searchBar.focus();
	} else {
		dataFeedHeading.style.display = "block";
		searchBar.style.display = "none";
		searchBar.blur();
	}
};

const feeds = {
	allUsersFeed: dataFeeds[0],
	requestsFeed: dataFeeds[1],
	friendsFeed: dataFeeds[2],
};

export {
	setStatusText,
	setUserAvatar,
	signinBtnLoader,
	startUI,
	resetUI,
	openChat,
	togglePopup,
	setTabBarColor,
	setDataFeedHeading,
	changeDataFeed,
	toggleSearchBar,
	feeds
};
