import { getProfile } from "../data/firestore.js";
import { openChat } from "../ui-state/ui-setters.js";
import renderMessages from "../ui-state/render-messages.js";

const openConversation = async (id) => {
	const { name, color, status } = await getProfile(id.substr(0, id.length - 3));
	openChat(name, color);
	renderMessages();
};

export default openConversation;
