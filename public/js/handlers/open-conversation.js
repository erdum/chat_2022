import { getProfile, sendMsg, listenMessages } from "../data/firestore.js";
import { updatePresence, listenUserPresence } from "../data/realtime-database.js";
import { openChat, setStatusBadge } from "../ui-state/ui-setters.js";
import { toggleStatusBadge } from "../ui-state/ui-state-togglers.js";
import renderMessages from "../ui-state/render-messages.js";
import { auth } from "../app.js";
import { AppNotification } from "../helper/register-service-worker.js";


let unsubMessagesListener = null;
let unsubPresenceListener = null;
let presenceTimer = null;

const clearMessages = () => {
	const chatBox = document.querySelector(".chat_ui");
	while (chatBox.children.length > 1) {
		chatBox.removeChild(chatBox.lastElementChild);
	}
};

const clearEventListener = (element) => {
	const clonedElement = element.cloneNode(true);
	element.parentNode.replaceChild(clonedElement, element);
};

const openConversation = async (id) => {
	const { name, color, status } = await getProfile(
		id.substr(0, id.length - 3)
	);
	clearEventListener(document.getElementById("send_msg"));
	clearEventListener(document.getElementById("msg_input"));
	clearMessages();
	openChat(name, color);
	toggleStatusBadge();
	updatePresence(auth.currentUser.uid, false);

	const handleSend = async () => {
		const text = msgInput.value;
		msgInput.value = "";
		updatePresence(auth.currentUser.uid, false);
		await sendMsg(id.substr(0, id.length - 3), text);
	};

	const handleTyping = (event) => {
		const text = event.target.value;
		updatePresence(auth.currentUser.uid, text.length > 0);
	};

	unsubPresenceListener = unsubPresenceListener = listenUserPresence(id.substr(0, id.length - 3), data => {
		const now = Date.now();
		if ((now - data.lastSeen) / 1000 < 15) {
			setStatusBadge(true, data.typing);
		} else {
			setStatusBadge(false, data.typing);
		}
	});

	if (presenceTimer != null) clearInterval(presenceTimer);
	presenceTimer = setInterval(() => {
		if (unsubPresenceListener != null) unsubPresenceListener();
		unsubPresenceListener = listenUserPresence(id.substr(0, id.length - 3), data => {
			const now = Date.now();
			if ((now - data.lastSeen) / 1000 < 15) {
				setStatusBadge(true, data.typing);
			} else {
				setStatusBadge(false, data.typing);
			}
		});
	}, 15000);


	if (unsubMessagesListener != null) unsubMessagesListener();
	unsubMessagesListener = listenMessages(messages => {
		const filteredMessages = messages.filter(msg => 
			(msg.sender === auth.currentUser.uid && msg.recipient === id.substr(0, id.length - 3)) ||
			(msg.sender === id.substr(0, id.length - 3) && msg.recipient === auth.currentUser.uid)
		);
		const renderableMessages = filteredMessages.map(msg => ({
			...msg,
			out: msg.recipient !== auth.currentUser.uid,
		}));

		const lastMsg = renderableMessages.at(-1);

		if (((Date.now() - (lastMsg.timestamp.seconds * 1000)) / 1000) < 5 && !lastMsg.out) {
			AppNotification.renderNotification(name, color, lastMsg.text);
		}
		renderMessages(renderableMessages);
	});

	const sendMsgBtn = document.getElementById("send_msg");
	const msgInput = document.getElementById("msg_input");
	sendMsgBtn.addEventListener("click", handleSend);
	sendMsgBtn.addEventListener("mousedown", (event) => {
		event.preventDefault();
		const currentActiveElement = document.activeElement;
		setTimeout(() => {
			currentActiveElement.focus();
		}, 1);
	});
	msgInput.addEventListener("input", handleTyping);
};

export default openConversation;
