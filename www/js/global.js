function goBack(){
	window.location="index.html";
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

function refreshPage(){
	window.location.reload();
}

function backToWorld(){
	window.location = "world.html";
}

function goToMain(){
	window.location="main.html";
}

//loading screen jquery code
$(window).load(function() {
	$("#loader").delay(500).fadeOut("fast");
});