import { getProfile, sendMsg, listenMessages } from "../data/firestore.js";
import { openChat } from "../ui-state/ui-setters.js";
import renderMessages from "../ui-state/render-messages.js";
import { auth } from "../app.js";

const msgInput = document.getElementById("msg_input");

let unsubMessagesListener = null;

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
	clearMessages();
	openChat(name, color);

	console.log(id.substr(0, id.length - 3));

	const handleSend = async () => {
		const text = msgInput.value;
		msgInput.value = "";
		await sendMsg(id.substr(0, id.length - 3), text);
	};

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
		renderMessages(renderableMessages);
	});

	const sendMsgBtn = document.getElementById("send_msg");
	sendMsgBtn.addEventListener("click", handleSend);
};

export default openConversation;
