function initSetting(){
window.addEventListener('orientationchange', doOnOrientationChange);
doOnOrientationChange();
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