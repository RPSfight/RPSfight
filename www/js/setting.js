function onBodyLoad() {
	document.addEventListener("deviceready", initSetting, false);
}

function initSetting() {
	initDB();

	loadSetting("Music", function(setting) {
		$("#Music").val(setting.value).slider('refresh');
	});

	loadSetting("SoundEffect", function(setting) {
		$("#SoundEffect").val(setting.value).slider('refresh');
	});

	loadSetting("Vibration", function(setting) {
		$("#Vibration").val(setting.value).slider('refresh');
	});

	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();

	$("[data-role='slider']").change(function(){
		var settings=new Object();
		settings["setting"]=$(this).attr("id");
		settings["value"]=parseInt($(this).val());
		saveSetting(settings);
	});
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