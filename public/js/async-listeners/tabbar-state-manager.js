const auBtn = document.querySelector("#all_users");
const reqBtn = document.querySelector("#requests");
const frBtn = document.querySelector("#friends");

auBtn.addEventListener("click", (e) => {
	location.hash = "#au";
});

reqBtn.addEventListener("click", (e) => {
	location.hash = "#req";
});

frBtn.addEventListener("click", (e) => {
	location.hash = "#fr";
});
