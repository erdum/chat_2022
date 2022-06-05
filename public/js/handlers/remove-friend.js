import { deleteFriend } from "../data/firestore.js";
import { togglePopup } from "../ui-state/ui-setters.js";

const removeFriend = async ({ id }) => {
	try {
		await deleteFriend(id.substr(0, id.length - 3));
	} catch (error) {
		console.log(error);
	} finally {
		togglePopup(false);
	}
};

export default removeFriend;