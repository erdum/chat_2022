import { addFriend } from "../data/firestore.js";
import { togglePopup } from "../ui-state/ui-setters.js";

const acceptRequest = async ({ id }) => {
	try {
		await addFriend(id.substr(0, id.length - 4));
	} catch (error) {
		console.log(error);
	} finally {
		togglePopup(false);
	}
};

export default acceptRequest;