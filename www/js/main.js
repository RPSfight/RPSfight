/**
 * @author johng
 *
 * Holds the javascript logic that was originally in main.html
 *
 */

var playerChosenMoves;
var computerChosenMoves;
var rps;
var start;
var end;
var position;
var playerCurLife;
var computerCurLife;

function init() {
	playerChosenMoves = new Array();
	computerChosenMoves = new Array();
	rps = ["rock", "paper", "scissors"];
	start = 40;
	end = 80;
	position = start;
	playerCurLife = 1;
	computerCurLife = 1;
	$("#explode").css('visibility', 'hidden');
	document.getElementById("player").src = "img/knight/brond/Ready.png";
	document.getElementById("computer").src = "img/knight/brond/Ready.png";

	document.addEventListener("deviceready", onDeviceReady, false);
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();

	//init database
	initDB();
}

function onDeviceReady() {
	//device ready
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
				"top" : "60px",
				"left" : "-180px"
			});
			$("#motion").css({
				"top" : "100px",
				"right" : "-120px"
			});
			break;
		default:
			$("#life").css({
				"top" : "auto",
				"left" : "auto"
			});
			$("#rps").css({
				"top" : "80px",
				"left" : "70px"
			});
			$("#compare").css({
				"top" : "80px",
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

	for (var i = 0; i < 5; i++) {
		computerChosenMoves.push(rps[Math.floor(Math.random() * 3)]);
	}
	document.getElementById("compare").innerHTML = initCompare(computerChosenMoves, playerChosenMoves);
	startpCompare(0);
	starteCompare(0);
	var size = Math.max(computerChosenMoves.length, playerChosenMoves.length);
	for (var i = 0; i < size; i++) {
		var eshow = computerChosenMoves.shift();
		var pshow = playerChosenMoves.shift();
		initRPS(eshow, pshow);
		fight(getComputer(), getPlayer());
	}
}

/*
 * set up the time interval
 * when motion finish hide compare and display rps triangle
 */
function fight(computer, player) {
	var p = "#player";
	var e = "#computer";
	var time = [600, 300, 20];
	var pixal = ["40px", "80px", "70px"];
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
		$(p).attr("src", "img/knight/brond/" + player.shift()).css("opacity", "0");
	}).animate(pgetpxend, time[1], function() {
		$(p).attr("src", "img/knight/brond/" + player.shift());
		$("#explode").css('visibility', 'visible');
	}).animate(pgetpxmove, time[1]).animate(pgetpxend, time[2]).animate(pgetpxmove, time[2]).animate(pgetpxend, time[2]).animate(pgetpxmove, time[2]).animate(pgetpxend, time[2]).animate(pgetpxmove, time[2]).animate(pgetpxend, time[1], function() {
		$(p).attr("src", "img/knight/brond/" + player.shift()).css("opacity", "0");
		$("#explode").css('visibility', 'hidden');
	}).animate(pgetpxstart, time[1], function() {
		$(p).attr("src", "img/knight/brond/" + player.shift());
	});

	//computer motion:
	$(e).animate(egetpxstart, time[0], function() {
		$("#computer").attr("src", "img/knight/brond/" + computer.shift()).css("opacity", "0");
	}).animate(egetpxend, time[1], function() {
		$("#computer").attr("src", "img/knight/brond/" + computer.shift());
	}).animate(egetpxmove, time[1]).animate(egetpxend, time[2]).animate(egetpxmove, time[2]).animate(egetpxend, time[2]).animate(egetpxmove, time[2]).animate(egetpxend, time[2]).animate(egetpxmove, time[2]).animate(egetpxend, time[1], function() {
		$("#computer").attr("src", "img/knight/brond/" + computer.shift()).css("opacity", "0");
	}).animate(egetpxstart, time[1], function() {
		$("#computer").attr("src", "img/knight/brond/" + computer.shift());
	});

}

//display how much charaters life left
function accessLife(charater, i) {
	var w = {
		"width" : Math.floor(82 * i) + "px"
	};
	$(charater).animate(w);
}

//switch poistion back and forward during two charater are fighting
function move() {
	if (position === start) {
		position = end;
	} else {
		position = start;
	}
	document.getElementById("player").style.left = position + "px";
	document.getElementById("computer").style.right = position + "px";
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