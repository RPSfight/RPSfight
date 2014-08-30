/**
 * @author Junxin
 */
var eimage = [];
var pimage = [];
var queueclear = false;
var queueclear = false;
var getstart;
var getend;

var time = 950;

//init compare display compare in html file
function initCompare(eList, pList) {
	queueclear = false;
	var string = "";
	var size = Math.max(pList.length, eList.length);
	string += "<div id='images'>";
	var position;
	var top;
	if (screen.width < 700) {
		position = 200;
		getstart = {
			"left" : "130px",
			"width" : "75px",
			"top" : "-=20px",
			opacity : '1'
		};
		getend = {
			"left" : "0px",
			"width" : "20px",
			"top" : "+=20px",
			opacity : '0'
		};

		top=100;
	} else {
		position = 600;
		getstart = {
			"left" : "310px",
			"width" : "100px",
			"top" : "-=40px",
			opacity : '1'
		};
		getend = {
			"left" : "0px",
			"width" : "20px",
			"top" : "+=40px",
			opacity : '0'
		};
		
		top=150;
	}
	for (var i = size - 1; i >= 0; i--) {
		if (pList[i]) {
			var image = "'img/rps/" + pList[i] + ".png'";
			string += "<img src=" + image + " style='position: absolute; top:20px; opacity : 0;width:20px; left:" + position.toString() + "px;' id='p" + i + "'>";
		}
		if (eList[i]) {
			image = "'img/rps/" + eList[i] + ".png'";
			string += "<img src=" + image + " style='position: absolute; top:"+top+"px; opacity : 0; width:20px; left:" + position.toString() + "px;' id='e" + i + "'>";
		}
	}
	string += "</div>";
	for (var i = 0; i < size; i++) {
		changeColor(pList[i], eList[i]);
	}
	return string;
}

function startpCompare(i) {
	var pid = "#p" + i;
	if ($(pid).length > 0) {
		$(pid).animate(getstart, time, function() {
			$(pid).attr("src", pimage.shift());
		}).animate(getend, time);
	}
}

function starteCompare(i) {
	var eid = "#e" + i;
	if ($(eid).length > 0) {
		$(eid).animate(getstart, time, function() {
			$(eid).attr("src", eimage.shift());
		}).animate(getend, time);
	}
}

/*
 * show rps
 * hide compare
 * when one of the start compare queue is done, shen queueclear true
 * when both start compare done, display activate
 */
function display() {
	if (queueclear) {
		$("#rps").css("visibility", "visible");
		$("#compare").css("visibility", "hidden");
	} else {
		queueclear = true;
	}
}

/*
 * change color if:
 * win: blue
 * lose: red
 * tie: greeen
 */
function changeColor(p, e) {
	var string = "img/rps/";
	var score;
	score = wintielose(p, e);
	switch(score) {
		case "win":
			if (p)
				pimage.push(string + p + "_blue.png");
			if (e)
				eimage.push(string + e + "_red.png");
			break;
		case "lose":
			if (p)
				pimage.push(string + p + "_red.png");
			if (e)
				eimage.push(string + e + "_blue.png");
			break;
		case "tie":
			pimage.push(string + p + "_green.png");
			eimage.push(string + p + "_green.png");
			break;
	}
}

//compare strings and return win/lose/tie
function wintielose(target, oppsite) {
	var result = "";
	switch(target) {
		case "rock":
			switch(oppsite) {
				case "rock":
					result = "tie";
					break;
				case "paper":
					result = "lose";
					break;
				case "scissors":
				default:
					result = "win";
			}
			break;
		case "paper":
			switch(oppsite) {
				case "paper":
					result = "tie";
					break;
				case "scissors":
					result = "lose";
					break;
				case "rock":
				default:
					result = "win";
			}
			break;
		case "scissors":
			switch(oppsite) {
				case "rock":
					result = "lose";
					break;
				case "scissors":
					result = "tie";
					break;
				case "paper":
				default:
					result = "win";
			}
			break;
		default:
			result = "lose";
	}
	return result;
}
