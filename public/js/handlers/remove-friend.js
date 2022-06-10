import { deleteFriend } from "../data/firestore.js";
import { togglePopup } from "../ui-state/ui-setters.js";

const removeFriend = async ({ id }) => {
	togglePopup(false);
	try {
		await deleteFriend(id.substr(0, id.length - 3));
	} catch (error) {
		console.log(error);
	}
};

export default removeFriend;
