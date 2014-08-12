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

