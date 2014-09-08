function onBodyLoad() {
	document.addEventListener("deviceready", initIndex, false);
}

function initIndex() {
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();
}

function doOnOrientationChange() {
	switch(window.orientation) {
		case -90:
		case 90:
			if (screen.width < 700) {
				$("#box").css({
					"top" : "80px",
				});
				break;
			} else {
				$("#box").css({
					"top" : "250px",
				});
				break;
			}
		default:
			if (screen.width < 700) {
				$("#box").css({
					"top" : "150px",
				});
			} else {
				$("#box").css({
					"top" : "350px",
				});
			}
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

function test() {
	window.location = "test.html";
}
