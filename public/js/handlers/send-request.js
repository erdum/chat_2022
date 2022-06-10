import { addRequest } from "../data/firestore.js";
import { togglePopup } from "../ui-state/ui-setters.js";

const sendRequest = async ({ id }) => {
	togglePopup(false);
	try {
		await addRequest(id.substr(0, id.length - 3));
	} catch (error) {
		console.log(error);
	}
};

export default sendRequest;
