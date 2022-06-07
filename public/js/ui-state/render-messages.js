import createMsg from "../components/msg.js";

const renderMessages = (messagesList) => {
	const chatBox = document.querySelector(".chat_ui");
	while (chatBox.children.length > 1) {
		chatBox.removeChild(chatBox.lastElementChild);
	}

	console.log(messagesList);

	messagesList.forEach((msg) => {
		createMsg(
			msg.id,
			chatBox,
			{
				key: msg.id,
				out: msg.out,
				text: msg.text,
				time: `
					${String(msg.timestamp.toDate().getHours()).padStart(2, "0")}:
					${String(msg.timestamp.toDate().getMinutes()).padStart(2, "0")} @ 
					${msg.timestamp.toDate().toLocaleString("default", { month: "short", day: "2-digit" })}
				`,
			},
			msg.out
		);
	});
};

export default renderMessages;
