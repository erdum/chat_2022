import { addRequest } from "../data/firestore.js";
import { togglePopup } from "../ui-state/ui-setters.js";

const sendRequest = async ({ id }) => {
	try {
		await addRequest(id.substr(0, id.length - 3));
	} catch (error) {
		console.log(error);
	} finally {
		togglePopup(false);
	}
};

export default sendRequest;