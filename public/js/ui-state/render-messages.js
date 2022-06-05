import createMsg from "../components/msg.js";

const renderMessages = (messagesList) => {
	const chatBox = document.querySelector(".chat_ui");
	while (chatBox.children.length > 1) {
		chatBox.removeChild(chatBox.firstChild);
	}

	messagesList.forEach((msg) => {
		console.log(msg);
	});
};

export default renderMessages;