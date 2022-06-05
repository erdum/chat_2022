import { feeds, togglePopup } from "../ui-state/ui-setters.js";
import sendRequestHanlder from "../handlers/send-request.js";
import acceptRequestHanlder from "../handlers/accept-request.js";
import removeFriendHandler from "../handlers/remove-friend.js";
import openConversation from "../handlers/open-conversation.js";

feeds.allUsersFeed.addEventListener("click", (event) => {
	const id = event.target.getAttribute("data-key");
	if (id !== null) {
		const userName = document.querySelector(`[data-key="${id}"]`).childNodes[0]
			.childNodes[0].innerText;
		togglePopup(
			true,
			`Confirm send request to\n${userName}`,
			sendRequestHanlder,
			null,
			{ id }
		);
	}
});

feeds.requestsFeed.addEventListener("click", (event) => {
	const id = event.target.getAttribute("data-key");
	if (id !== null) {
		togglePopup(
			true,
			"Confirm accept request",
			acceptRequestHanlder,
			null,
			{ id }
		);;
	}
});

feeds.friendsFeed.addEventListener("click", (event) => {
	const id = event.target.getAttribute("data-key");
	if (id !== null && event.target.tagName === "I") {
		const userName = document.querySelector(`[data-key="${id}"]`).childNodes[0].childNodes[0].innerText;
		togglePopup(
			true,
			`Confirm remove ${userName}\nfrom friends list`,
			removeFriendHandler,
			null,
			{ id }
		);
	} else if (id !== null) {
		openConversation(id);
	}
});
