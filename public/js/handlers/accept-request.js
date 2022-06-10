import { addFriend } from "../data/firestore.js";
import { togglePopup } from "../ui-state/ui-setters.js";

const acceptRequest = async ({ id }) => {
	togglePopup(false);
	try {
		await addFriend(id.substr(0, id.length - 4));
	} catch (error) {
		console.log(error);
	}
};

export default acceptRequest;
