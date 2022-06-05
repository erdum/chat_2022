const removeAllEvents = (elem) => {
	const elemClone = elem.cloneNode(true);
	elem.parentNode.replaceChild(elemClone, elem);
};

export default removeAllEvents;
