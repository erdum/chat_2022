const body = document.querySelector(".bar_group");

body.addEventListener("scroll", (e) => {
	if (e.target.scrollTop !== 0 && location.hash !== "#scrolled") {
		location.hash = "#scrolled";
	}
});
