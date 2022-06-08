const createEmptyFeedItem = (key, parent) => {
	const li = document.createElement("li");
	li.id = key;
	parent.appendChild(li);
};

const populateFeedItem = (data) => {
	const item = document.getElementById(data.key);
	item.outerHTML = `<li id=${
		data.key
	} class="data_feed_item"><img class="user_icon" src=${
		data.iconSrc.replace(/\s/, "+")
	} loading="lazy"><div data-key=${
		data.key
	} class="user_action_wrapper"><div class="user_data"><h3>${
		data.userName
	}</h3><p style="color: ${
		data.userStatus == "offline" ? "gray" : "white"
	}; font-weight: ${data.userStatus == "online" ? "bold" : "normal"};">${
		data.userStatus
	}</p></div><div class="user_action"><i data-key=${data.key} class="fas ${
		data.actionIcon
	}"></i></div></div></li>`;
};

const createFeedItem = (key, parent, data) => {
	createEmptyFeedItem(key, parent);
	populateFeedItem(data);
};

export default createFeedItem;
