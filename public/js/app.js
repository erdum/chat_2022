import {
	GoogleAuthProvider,
	getAuth,
	signInWithRedirect,
	onAuthStateChanged,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import {
	toggleIntro,
	toggleNavbar,
	toggleTabBar,
	toggleActionBar,
	toggleForm,
	toggleFeed,
	toggleChat,
} from "./ui-state/ui-state-togglers.js";
import { signinBtnLoader } from "./ui-state/ui-setters.js";
import joinHandler from "./handlers/join-handler.js";
import app from "./data/firebase.js";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const menuBtn = document.querySelector("#menu_btn");
// const searchBtn = document.querySelector("#search_btn");
const introWrapper = document.querySelector(".intro");
const signinBtn = document.getElementById("form_btn");

let JOIN_LOCK = false;

window.addEventListener("DOMContentLoaded", async (e) => {
	location.hash = "#au";
	introWrapper.style.setProperty("min-height", window.innerHeight + "px");
	setTimeout(() => {
		toggleIntro();
	}, 1000);
	setTimeout(() => {
		toggleIntro();
		toggleNavbar();
		toggleForm();
	}, 3000);
	setTimeout(() => {
		introWrapper.style.setProperty("min-height", "0");
		onAuthStateChanged(auth, (user) => {
			if (user != null) {
				JOIN_LOCK = true;
				signinBtnLoader(true);
				joinHandler(user);
			} else {
				JOIN_LOCK = false;
			}
		});
	}, 4000);
});

signinBtn.addEventListener("click", async () => {
	if (JOIN_LOCK) return;
	signinBtnLoader(true);
	signInWithRedirect(auth, provider);
});

menuBtn.addEventListener("click", () => {
	signOut(auth).then(() => {
		console.log("User successfully loged out");
		location.reload();
	});
});

export { auth };
