import { getProfile, sendMsg, listenMessages } from "../data/firestore.js";
import { openChat } from "../ui-state/ui-setters.js";
import renderMessages from "../ui-state/render-messages.js";
import { auth } from "../app.js";

const sendMsgBtn = document.getElementById("send_msg");
const msgInput = document.getElementById("msg_input");

let unsubMessagesListener = null;

const openConversation = async (id) => {
	const { name, color, status } = await getProfile(
		id.substr(0, id.length - 3)
	);

	const handleSend = async () => {
		const text = msgInput.value;
		msgInput.value = "";
		await sendMsg(id.substr(0, id.length - 3), text);
	};
	openChat(name, color);

	if (unsubMessagesListener != null) unsubMessagesListener();
	unsubMessagesListener = listenMessages(messages => {
		const filteredMessages = messages.filter(msg => msg.recipient === auth.currentUser.uid || msg.recipient === id.substr(0, id.length - 3));
		const renderableMessages = filteredMessages.map(msg => ({
			...msg,
			out: msg.recipient !== auth.currentUser.uid,
		}));
		renderMessages(renderableMessages);
	});

	sendMsgBtn.removeEventListener("click", handleSend);
	sendMsgBtn.addEventListener("click", handleSend);
};

export default openConversation;
