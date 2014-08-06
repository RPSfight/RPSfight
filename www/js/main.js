/**
 * @author johng
 *
 * Holds the javascript logic that was originally in main.html
 *
 */

var playerChosenMoves = [];
var computerChosenMoves = [];
var rps;
var playerCurLife;
var computerCurLife;
var visibility;
var gameCompleted;
//In order to have vibration on attact, set vibrate to true
//Time delay has issue between motion and compare, need to change every time set vibrate.
var setting = {
	vibrate : false,
};

var saveData = {
	charater : "knight",
	color : "brond"
};

var background = ["greatwall", "mountain"];

var charImgSet;
var playerData = [];
var computerData = [];
var databaseReady = 0;

function initMain() {
	//init database
	initDB();
	loadPlayer(function(p) {
		playerData = p;
		databaseReady++;
	});
	loadComputer(function(c) {
		computerData = c;
		databaseReady++;
	});
	$("body").css("background", "url(img/background/" + background[Math.floor(Math.random() * background.length)] + ".png) no-repeat");
	rps = ["rock", "paper", "scissors"];
	charImgSet = "img/" + saveData["charater"] + "/" + saveData["color"] + "/", playerCurLife = 1;
	computerCurLife = 1;
	$("#explode").css('visibility', 'hidden');
	$("#player").attr("src", charImgSet + "Ready.png");
	$("#computer").attr("src", charImgSet + "Ready.png");
	
	$("#rock").on("touchstart touchend",function(){add("rock");});
	$("#paper").on("touchstart touchend",function(){add("paper");});
	$("#scissors").on("touchstart touchend",function(){add("scissors");});

	document.addEventListener("deviceready", onDeviceReady, false);
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();
}

function onDeviceReady() {
	//device ready
	document.addEventListener("pause", onPause, false);
	document.addEventListener("resume", onResume, false);
}

/*
 * This  function is for orientation
 */
function doOnOrientationChange() {
	switch(window.orientation) {
		case -90:
		case 90:
			$("#life").css({
				"top" : "10px",
				"left" : "120px"
			});
			$("#rps").css({
				"top" : "30px",
				"left" : "-80px"
			});
			$("#compare").css({
				"top" : "30px",
				"left" : "-180px"
			});
			$("#motion").css({
				"top" : "100px",
				"right" : "-120px"
			});
			$("#explode").css({
				"top" : "100px",
				"right" : "-120px"
			});
			$("body").css({
				"background-size" : "cover",
				"background-position" : "bottom"
			});
			//contain/cover
			$("#menu").css({
				"left" : "120px",
				"top" : "10px"
			});
			break;
		default:
			$("#life").css({
				"top" : "auto",
				"left" : "auto"
			});
			$("#rps").css({
				"top" : "100px",
				"left" : "60px"
			});
			$("#compare").css({
				"top" : "100px",
				"left" : "auto"
			});
			$("#motion").css({
				"top" : "300px",
				"right" : "auto"
			});
			$("#explode").css({
				"top" : "300px",
				"right" : "auto"
			});
			$("#menu").css({
				"left" : "auto",
				"top" : "auto"
			});
			$("body").css({
				"background-size" : "cover",
				"background-position" : "right"
			});
			//contain/cover
			break;
	}
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
	while (databaseReady !== 2) {
	}

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
	var p = "#player";
	var e = "#computer";
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
		$(p).attr("src", charImgSet + player.shift()).css("opacity", "0");
	}).animate(pgetpxend, time[1], function() {
		//fight image 2
		$(p).attr("src", charImgSet + player.shift());
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
		$(p).attr("src", charImgSet + player.shift()).css("opacity", "0");
		$("#explode").css('visibility', 'hidden');
	}).animate(pgetpxstart, time[1], function() {
		if (playerData.current_life > 0) {
			$(p).attr("src", charImgSet + player.shift());
		} else {
			$(p).attr("src", charImgSet + "Death2.png");
			gameCompleted = true;
		}
		if (computerData.current_life > 0) {
			$(e).attr("src", charImgSet + computer.shift());
		} else {
			$(e).attr("src", charImgSet + "Death2.png");
			gameCompleted = true;
		}
		if (gameCompleted || geti === size - 1) {
			triangleVisibilty();
			$(p).clearQueue();
			$(e).clearQueue();
		}
		if (playerData.current_life <= 0 && computerData.current_life <= 0) {
			setTimeout(function(){window.location = "gameover.html?result=tie";},1500);
		} else if (playerData.current_life <= 0) {
			setTimeout(function(){window.location = "gameover.html?result=lose";},1500);
		} else if (computerData.current_life <= 0) {
			setTimeout(function(){window.location = "gameover.html?result=win";},1500);
		}
	});

	//computer motion:
	$(e).animate(egetpxstart, time[0], function() {
		$(e).attr("src", charImgSet + computer.shift()).css("opacity", "0");
	}).animate(egetpxend, time[1], function() {
		$(e).attr("src", charImgSet + computer.shift());
	}).animate(egetpxmove, time[1]).animate(egetpxend, time[2]).animate(egetpxmove, time[2]).animate(egetpxend, time[2]).animate(egetpxmove, time[2]).animate(egetpxend, time[2]).animate(egetpxmove, time[2]).animate(egetpxend, time[1], function() {
		$(e).attr("src", charImgSet + computer.shift()).css("opacity", "0");
	}).animate(egetpxstart, time[1]);

}

//display how much charaters life left
function accessLife(charater, lifePersentage) {
	var w = {
		"width" : Math.floor(82 * lifePersentage) + "px"
	};
	$(charater).animate(w);
}

//Add rock, paper, or scissors into array
function add(id) {
	playerChosenMoves.push(id);
}

function someoneWasHurt(type) {
	if (type === "player") {
		//player was hurt
		playerCurLife = playerCurLife - .1;
		playerLife(playerCurLife);
	} else {
		//computer was hurt
		computerCurLife = computerCurLife - .1;
		computerLife(computerCurLife);
	}
}

function resume() {
	$("#menuBox").popup("close");
}

function restart() {
	if (confirm('Are you sure?')) {
		window.location.reload();
	}
}

function quit() {
	if (confirm('Are you sure?')) {
		window.location = "index.html";
	}
}

//loading screen jquery code
$(window).load(function() {
	$("#loader").delay(500).fadeOut("fast");
});
