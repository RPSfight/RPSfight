var level;
var difficulty;
var playerData;
var computerData;
var computersData = [];

function onBodyLoad() {
	document.addEventListener("deviceready", initWorld, false);
}

function initWorld() {
	initDB();
	loadPlayer(function(player) {
		playerData = player;
		$("#greece").click();
	});
	loadComputer(function(computer) {
		computerData = computer;
	});
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();
}

function getLevel(country) {
	var start = {
		Greece : 1,
		China : 25,
		Japan : 49
	};
	var end = {
		Greece : 25,
		China : 49,
		Japan : 73
	};
	$("#text").empty();
	for (var i = start[country]; i < end[country]; i++) {
		if (i <= playerData.current_computer_level) {
			$("#text").append("<a href='#difficulty' data-rel='popup' data-position-to='window' data-transition='fade' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-a level' onclick='setlevel(this.innerHTML)'>" + i + "</a>");
		} else {
			$("#text").append("<a href='#' class='ui-btn ui-icon-lock ui-btn-icon-left ui-corner-all ui-shadow ui-btn-inline ui-btn-b locklevel'></a>");
		}
	}
}

function setlevel(text) {
	level = parseInt(text);
	if (computersData[level]) {
		setDifficulty(level);
	} else {
		loadComputerDefaultStatsTable(level, function(computer) {
			computersData[level] = computer;
			setDifficulty(level);
		});
	}
}

function setDifficulty(level) {
	$("#medium,#hard").empty();
	if (computersData[level].medium_lock) {
		$("#medium").append("<a href='#' class='ui-btn ui-icon-lock ui-btn-icon-left ui-corner-all ui-shadow ui-btn-inline ui-btn-b'>Medium</a>");
		$("#hard").append("<a href='#' class='ui-btn ui-icon-lock ui-btn-icon-left ui-corner-all ui-shadow ui-btn-inline ui-btn-b'>Hard</a>");
	} else {
		$("#medium").append("<a href='#' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-a' onclick='goMain(this.innerHTML)'>Medium</a>");
		if (computersData[level].hard_lock) {
			$("#hard").append("<a href='#' class='ui-btn ui-icon-lock ui-btn-icon-left ui-corner-all ui-shadow ui-btn-inline ui-btn-b'>Hard</a>");
		} else {
			$("#hard").append("<a href='#' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-a' onclick='goMain(this.innerHTML)'>Hard</a>");
		}
	}
}

function goMain(d) {
	difficulty = d;
	if (!playerData || !computerData || playerData.current_life <= 0 || computerData.current_life <= 0) {
		newGame();
	} else {
		$("#difficulty").popup("close");
		setTimeout(function(){$("#resumeOrNew").popup("open");},1000);
	}
}

function newGame() {
	playerData["current_life"] = playerData.max_life;
	computerData = computersData[level];
	computerData["difficulty"] = difficulty;
	computerData["current_life"] = computerData["max_life"] = computerData.life;
	savePlayer(playerData);
	saveComputer(computerData);
	setTimeout(function(){goToMain();},1000);
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