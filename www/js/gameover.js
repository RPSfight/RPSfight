function initGameover() {
	$("body").css({
		"background" : "url(img/background/" + getQuery("result") + ".png) no-repeat"
	});
	$("body").css({
		"background-size" : "cover",
	});
	setTimeout(function() {
		window.location = "world.html";
	}, 1500);
}

function getQuery(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}
