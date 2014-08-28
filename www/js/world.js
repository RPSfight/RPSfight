var level;
var theme = ["a", "b"];
function initWorld() {
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();
	$("#greece").click();
}

function getLevel(country) {
	$("#text").empty();
	switch(country) {
		case "Greece":
			for (var i = 1; i < 25; i++) {
				$("#text").append("<a href='#diffculty' data-rel='popup' data-position-to='window' data-transition='fade' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-" + theme[i % 2] + " level' onclick='setlevel(this.innerHTML)'>" + i + "</a>");
			}
			break;
		case "China":
			for (var i = 25; i < 49; i++) {
				$("#text").append("<a href='#diffculty' data-rel='popup' data-position-to='window' data-transition='fade' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-" + theme[i % 2] + " level' onclick='setlevel(this.innerHTML)'>" + i + "</a>");
			}
			break;
		case "Japan":
			for (var i = 49; i < 73; i++) {
				$("#text").append("<a href='#diffculty' data-rel='popup' data-position-to='window' data-transition='fade' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-" + theme[i % 2] + " level' onclick='setlevel(this.innerHTML)'>" + i + "</a>");
			}
			break;
	}
}

function setlevel(text) {
	level = text;
}

function goMain(diffculty) {
	window.location = "main.html?level=" + level + "&diffculty=" + diffculty;
}

function doOnOrientationChange() {
	switch(window.orientation) {
		case -90:
		case 90:

			break;
		default:
			break;
	}
}