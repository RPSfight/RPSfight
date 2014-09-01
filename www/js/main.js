/**
 * @author johng
 *
 * Holds the javascript logic that was originally in main.html
 *
 */

var playerChosenMoves = [];
var computerChosenMoves = [];
var rps = ["rock", "paper", "scissors"];
var visibility;
var gameCompleted;
//In order to have vibration on attact, set vibrate to true
//Time delay has issue between motion and compare, need to change every time set vibrate.
var setting = {
	vibrate : false,
};

//var background = ["greatwall", "mountain"];

var playerImgSet;
var computerImgSet;
var playerData = [];
var computerData = [];
var p = "#player";
var e = "#computer";

var timeStart = false;

var maxTime = currentTime = 2.0;

var lastId;

function initMain() {
	//init database
	initDB();
	loadPlayer(function(player) {
		playerData = player;
		playerImgSet = "img/" + playerData["character"] + "/" + playerData["color"] + "/";
		$(p).attr("src", playerImgSet + "Ready.png");
		//player blood bar
		accessLife("#pBlood", playerData.current_life / playerData.max_life);
	});

	loadComputer(function(computer) {
		computerData = computer;
		computerImgSet = "img/" + computerData["character"] + "/" + computerData["color"] + "/";
		$(e).attr("src", computerImgSet + "Ready.png");
		//computer blood bar
		accessLife("#eBlood", computerData.current_life / computerData.max_life);
		setDifficulty(computerData.difficulty);
	});

	$("#explode").css('visibility', 'hidden');
	$("body").css("background", "url(img/background/greatwall.png) no-repeat");

	document.addEventListener("deviceready", onDeviceReady, false);
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();
	document.getElementById("rps").addEventListener("touchstart", touchstart, false);
	//$("#rock,#paper,#scissors").click(function(){add($(this).attr("id"));});
}

function touchstart(e) {
	e.preventDefault();
	document.getElementById("rps").addEventListener("touchmove", function() {
		var id = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY).id;
		if (id !== lastId) {
			if (id === "rock" || id === "paper" || id === "scissors") {
				add(id);
			}
			lastId = id;
		}
	});
}

function onDeviceReady() {

}

/*
 * set up random array for computer
 * inital RPS js
 * intial Compare js
 * use fight() method display motion
 * reset arrays
 */

function play() {
	gameCompleted = false;

	//hidden triangle and appear compare
	visibility = true;
	triangleVisibilty();

	//ramdom choose computer moves
	for (var i = 0; i < 5; i++) {
		computerChosenMoves.push(rps[Math.floor(Math.random() * rps.length)]);
	}
	document.getElementById("compare").innerHTML = initCompare(computerChosenMoves, playerChosenMoves);
	var size = Math.max(computerChosenMoves.length, playerChosenMoves.length);
	var i = 0;
	for (var i = 0; i < size && !gameCompleted; i++) {
		initRPS(computerChosenMoves[i], playerChosenMoves[i]);
		fight(getComputer(), getPlayer(), i, size);
	}
}

function triangleVisibilty() {
	if (visibility) {
		$("#rps").css("visibility", "hidden");
		$("#compare").css("visibility", "visible");
		visibility = false;
	} else {
		$("#rps").css("visibility", "visible");
		$("#compare").css("visibility", "hidden");
	}
}

/*
 * set up the time interval
 * when motion finish hide compare and display rps triangle
 */
function fight(computer, player, geti, size) {
	var time = [600, 300, 20];
	var pixal = ["40px", "75px", "65px"];
	var pgetpxstart = {
		opacity : '1'
	};
	var egetpxstart = {
		opacity : '1'
	};
	var pgetpxend = {
		opacity : '1'
	};
	var egetpxend = {
		opacity : '1'
	};
	var pgetpxmove = {
		opacity : '1'
	};
	var egetpxmove = {
		opacity : '1'
	};

	pgetpxstart["left"] = pixal[0];
	egetpxstart["right"] = pixal[0];
	pgetpxend["left"] = pixal[1];
	egetpxend["right"] = pixal[1];
	pgetpxmove["left"] = pixal[2];
	egetpxmove["right"] = pixal[2];

	//player motion:
	$(p).animate(pgetpxstart, time[0], function() {
		//compare movement of player
		startpCompare(geti);
		//compare movement of computer
		starteCompare(geti);
		//fight image 1
		$(p).attr("src", playerImgSet + player.shift()).css("opacity", "0");
	}).animate(pgetpxend, time[1], function() {
		//fight image 2
		$(p).attr("src", playerImgSet + player.shift());
		//player blood bar
		initFight(computerChosenMoves.shift(), playerChosenMoves.shift());
		accessLife("#pBlood", playerData.current_life / playerData.max_life);
		//computer blood bar
		accessLife("#eBlood", computerData.current_life / computerData.max_life);
	}).animate(pgetpxmove, time[1], function() {
		$("#explode").css('visibility', 'visible');
		if (setting["vibrate"]) {
			navigator.notification.vibrate(100);
		}
	}).animate(pgetpxend, time[2]).animate(pgetpxmove, time[2]).animate(pgetpxend, time[2]).animate(pgetpxmove, time[2]).animate(pgetpxend, time[2]).animate(pgetpxmove, time[2]).animate(pgetpxend, time[1], function() {
		//fight image 3
		$(p).attr("src", playerImgSet + player.shift()).css("opacity", "0");
		$("#explode").css('visibility', 'hidden');
	}).animate(pgetpxstart, time[1], function() {
		if (playerData.current_life > 0) {
			$(p).attr("src", playerImgSet + player.shift());
		} else {
			$(p).attr("src", playerImgSet + "Death2.png");
			gameCompleted = true;
		}
		if (computerData.current_life > 0) {
			$(e).attr("src", computerImgSet + computer.shift());
		} else {
			$(e).attr("src", computerImgSet + "Death2.png");
			gameCompleted = true;
		}
		if (gameCompleted || geti === size - 1) {
			triangleVisibilty();
			$(p).clearQueue();
			$(e).clearQueue();
			savePlayer(playerData);
			saveComputer(computerData);
		}
		if (playerData.current_life <= 0 && computerData.current_life <= 0) {
			initGameover("tie");
		} else if (playerData.current_life <= 0) {
			initGameover("lose");
		} else if (computerData.current_life <= 0) {
			initGameover("win");
		}
	});

	//computer motion:
	$(e).animate(egetpxstart, time[0], function() {
		$(e).attr("src", computerImgSet + computer.shift()).css("opacity", "0");
	}).animate(egetpxend, time[1], function() {
		$(e).attr("src", computerImgSet + computer.shift());
	}).animate(egetpxmove, time[1]).animate(egetpxend, time[2]).animate(egetpxmove, time[2]).animate(egetpxend, time[2]).animate(egetpxmove, time[2]).animate(egetpxend, time[2]).animate(egetpxmove, time[2]).animate(egetpxend, time[1], function() {
		$(e).attr("src", computerImgSet + computer.shift()).css("opacity", "0");
	}).animate(egetpxstart, time[1]);

}

function accessLife(charater, lifePersentage) {
	var lifewidth;
	if (screen.width < 700) {
		lifewidth = 82;
	} else {
		lifewidth = 200;
	}
	var w = {
		"width" : Math.floor(lifewidth * lifePersentage) + "px"
	};
	$(charater).animate(w);
}

//Add rock, paper, or scissors into array
function add(id) {
	if (!timeStart) {
		startTime();
		timeStart = true;
	}
	$("#" + id).attr("src", "img/rps/" + id + "_green.png");
	setTimeout(function() {
		$("#" + id).attr("src", "img/rps/" + id + ".png");
	}, 200);
	playerChosenMoves.push(id);
}

function startTime() {
	var timer = setInterval(function() {
		if (currentTime >= 0) {
			$("#timer").text(currentTime.toFixed(1));
			currentTime = Math.round(currentTime * 10 - 1) / 10;
		} else {
			clearInterval(timer);
			timeStart = false;
			$("#timer").text(maxTime.toFixed(1));
			currentTime = maxTime;
			play();
		}
	}, 100);
}

function resume() {
	$("#menuBox").popup("close");
}

function restart() {
	if (confirm('Are you sure?')) {
		playerData["current_life"] = playerData.max_life;
		computerData["current_life"] = computerData.max_life;
		savePlayer(playerData);
		saveComputer(computerData);
		$(p).clearQueue();
		$(e).clearQueue();
		setTimeout(function(){refreshPage();},1000);
	}
}

function quit() {
	if (confirm('Are you sure?')) {
		$(p).finish();
		$(e).finish();
		backToWorld();
	}
}
