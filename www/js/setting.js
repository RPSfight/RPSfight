function initSetting(){
window.addEventListener('orientationchange', doOnOrientationChange);
doOnOrientationChange();
}

function doOnOrientationChange() {
	switch(window.orientation) {
		case -90:
		case 90:
			$("#page").css({
				"width" : "568px"
			});
			break;
		default:
			$("#page").css({
				"width" : "320px"
			});
			break;
	}
}