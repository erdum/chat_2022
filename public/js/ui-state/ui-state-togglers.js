// ---------------------------- DOM Elements ------------------
const navbar = document.querySelector(".my_navbar");
const banner = document.querySelector(".banner");
const status = document.querySelector(".status");
const tabBar = document.querySelector(".tab_bar");
const actionBar = document.querySelector(".action_bar");
const form = document.querySelector(".entry");
const introBanner = document.querySelector(".intro_banner");
const introText = document.querySelector(".intro>div:not(.intro_banner)");
const dataList = document.querySelector(".list_wrapper");
const chat = document.querySelector(".chat_ui");

// ---------------------------- States ------------------------
let navbarState = false;
let bannerState = true;
let tabState = false;
let actionBarState = false;
let introState = false;
let feedState = false;
let chatState = false;

// ---------------------------- State Togglers ------------------
const toggleNavbar = () => {
	if (!navbarState) {
		navbar.style.height = "5.5rem";
	} else {
		navbar.style.height = 0;
	}
	navbarState = !navbarState;
};

const toggleBanner = () => {
	if (!bannerState) {
		banner.style.opacity = "100%";
		status.style.opacity = 0;
	} else {
		banner.style.opacity = 0;
		status.style.opacity = "100%";
	}
	bannerState = !bannerState;
};

const toggleTabBar = () => {
	if (!tabState) {
		tabBar.style.height = "4.2rem";
	} else {
		tabBar.style.height = 0;
	}
	tabState = !tabState;
};

const toggleActionBar = () => {
	if (!actionBarState) {
		actionBar.style.setProperty("min-height", "7.2rem");
		actionBar.style.height = "auto";
	} else {
		actionBar.style.setProperty("min-height", "0");
		actionBar.style.height = "0";
	}
	actionBarState = !actionBarState;
};

const toggleForm = () => {
	form.classList.toggle("hide_form");
};

const toggleIntro = () => {
	if (!introState) {
		introBanner.style.width = "80%";
		introText.style.opacity = "100%";
	} else {
		introBanner.style.width = 0;
		introText.style.opacity = 0;
	}
	introState = !introState;
};

const toggleFeed = () => {
	if (feedState) {
		dataList.style.display = "none";
	} else {
		dataList.style.display = "flex";
	}
	feedState = !feedState;
};

const toggleChat = () => {
	if (chatState) {
		chat.style.display = "none";
	} else {
		chat.style.display = "block";
	}
	chatState = !chatState;
};

export {
	toggleNavbar,
	toggleBanner,
	toggleTabBar,
	toggleActionBar,
	toggleForm,
	toggleIntro,
	toggleFeed,
	toggleChat,
};
