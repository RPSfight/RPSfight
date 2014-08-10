function initIndex() {
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();
}

function doOnOrientationChange() {
	switch(window.orientation) {
		case -90:
		case 90:
			$("#box").css({
				"top" : "50px",
			});
			break;
		default:
			$("#box").css({
				"top" : "150px",
			});
			break;
	}
}

function play() {
	window.location = "world.html";
}

function update() {
	window.location = "update.html";
}

function setting() {
	window.location = "setting.html";
}

function viewDatabase() {
	window.location = "database_log.html";
}