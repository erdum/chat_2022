const createEmptyMsg = (key, parent) => {
	const div = document.createElement("div");
	div.id = key;
	parent.appendChild(div);
};

const populateMsg = (data, out) => {
	const msg = document.getElementById(data.key);
	let className = out ? '"incoming_msg outgoing_msg"' : "incoming_msg";
	msg.outerHTML = `<div id=${data.key} class=${className}><p>${data.text}</p><small class="msg_time">${data.time}</small></div>`;
};

const createMsg = (key, parent, data, out = true) => {
	createEmptyMsg(key, parent);
	populateMsg(data, out);
};

export default createMsg;
