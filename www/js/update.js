function initUpdate() {
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();
}

function doOnOrientationChange() {
	switch(window.orientation) {
		case -90:
		case 90:
			$("#attdef").css({
				"top" : "-180px",
				"left" : "280px",
			});
			break;
		default:
			$("#attdef").css({
				"top" : "auto",
				"left" : "auto",
			});
			break;
	}
}