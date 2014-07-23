/**
 * @author johng
 *
 * Holds the javascript logic that was originally in main.html
 *
 */

var playerChosenMoves;
var computerChosenMoves;
var rps;
var playerCurLife;
var computerCurLife;
var visibility;
//In order to have vibration on attact, set vibrate to true
//Time delay has issue between motion and compare, need to change every time set vibrate.
var setting = {
	vibrate : false,
};

var saveData = {
	charater : "knight",
	color : "brond"
};

var charImgSet;
var player;
var computer;

function initMain() {
	playerChosenMoves = new Array();
	computerChosenMoves = new Array();
	rps = ["rock", "paper", "scissors"];
	charImgSet = "img/" + saveData["charater"] + "/" + saveData["color"] + "/", playerCurLife = 1;
	computerCurLife = 1;
	$("#explode").css('visibility', 'hidden');
	$("#player").attr("src", charImgSet + "Ready.png");
	$("#computer").attr("src", charImgSet + "Ready.png");

	document.addEventListener("deviceready", onDeviceReady, false);
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();

	//init database
	initDB();
	loadPlayer(function(p){
		player=p;
	});
	loadComputer(function(c){
		computer=c;
	});
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
	visibility = true;
	for (var i = 0; i < 5; i++) {
		computerChosenMoves.push(rps[Math.floor(Math.random() * 3)]);
	}
	document.getElementById("compare").innerHTML = initCompare(computerChosenMoves, playerChosenMoves);
	var size = Math.max(computerChosenMoves.length, playerChosenMoves.length);
	/*	startpCompare(0);
	 starteCompare(0);
	 for (var i = 0; i < size; i++) {
	 var eshow = computerChosenMoves.shift();
	 var pshow = playerChosenMoves.shift();
	 initRPS(eshow, pshow);
	 fight(getComputer(), getPlayer());
	 }*/
	triangleVisibilty();
	var i = 0;
	for (var i = 0; i < size; i++) {
		var eshow = computerChosenMoves.shift();
		var pshow = playerChosenMoves.shift();
		var finish=false;
		initRPS(eshow, pshow);
		//if(playerlife<==0||computerlife<==0){i=size}else
		if(i===size-1){
			finish=true;
		}
		fight(getComputer(), getPlayer(), i, finish);
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
function fight(computer, player, geti, finish) {
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
		startpCompare(geti);
		starteCompare(geti);
		$(p).attr("src", charImgSet + player.shift()).css("opacity", "0");
	}).animate(pgetpxend, time[1], function() {
		$(p).attr("src", charImgSet + player.shift());
	}).animate(pgetpxmove, time[1], function() {
		$("#explode").css('visibility', 'visible');
		if (setting["vibrate"]) {
			navigator.notification.vibrate(100);
		}
	}).animate(pgetpxend, time[2]).animate(pgetpxmove, time[2]).animate(pgetpxend, time[2]).animate(pgetpxmove, time[2]).animate(pgetpxend, time[2]).animate(pgetpxmove, time[2]).animate(pgetpxend, time[1], function() {
		$(p).attr("src", charImgSet + player.shift()).css("opacity", "0");
		$("#explode").css('visibility', 'hidden');
	}).animate(pgetpxstart, time[1], function() {
		//if(life>0){
		$(p).attr("src", charImgSet + player.shift());
		//}else{
		//	$(p).attr("src", charImgSet + "Death2.png");
		//}
		if(finish){
			triangleVisibilty();
		}
	});

	//computer motion:
	$(e).animate(egetpxstart, time[0], function() {
		$(e).attr("src", charImgSet + computer.shift()).css("opacity", "0");
	}).animate(egetpxend, time[1], function() {
		$(e).attr("src", charImgSet + computer.shift());
	}).animate(egetpxmove, time[1]).animate(egetpxend, time[2]).animate(egetpxmove, time[2]).animate(egetpxend, time[2]).animate(egetpxmove, time[2]).animate(egetpxend, time[2]).animate(egetpxmove, time[2]).animate(egetpxend, time[1], function() {
		$(e).attr("src", charImgSet + computer.shift()).css("opacity", "0");
	}).animate(egetpxstart, time[1], function() {
		//if(life>0){
		$(e).attr("src", charImgSet + computer.shift());
		//}else{
		//	$(p).attr("src", charImgSet + "Death2.png");
		//}
	});

}

//display how much charaters life left
function accessLife(charater, i) {
	var w = {
		"width" : Math.floor(82 * i) + "px"
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