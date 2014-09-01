var settings = ["music", "sound_effect", "vibration_effect"];

function initSetting() {
	initDB();
	for (var i = 0; i < settings.length; i++) {
		loadSetting(settings[i], function(setting) {
			if (setting) {
				$("#"+settings[i]).attr("checked", true).checkboxradio("refresh");
			}
		});
	}

	alert($("#music").prop("checked"));
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