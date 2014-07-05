/**
 * @author Junxin
 */
var computerList = new Array();
var playerList = new Array();

//init compare display compare in html file
function initCompare(eList, pList) {
	computerList = eList;
	playerList = pList;
	var string = "";
	var size;
	if (pList.length >= eList.length) {
		size = pList.length;
	} else {
		size = eList.length;
	}
	string += "<span style=\"position:absolute;  top: 20px; width:320px; height:10px; background-image: url('img/rps/line.png'); display:block\"><\span>";
	string += "<span style=\"position:absolute;  top: 60px; width:320px; height:10px; background-image: url('img/rps/line.png'); display:block\"><\span>";
	string += "<div id='images'>";
	var position = 250;
	for (var i = 0; i < size; i++) {
		if (pList[i]) {
			var image = "'img/rps/" + pList[i] + ".png'";
			string += "<img src=" + image + " style='position: absolute; top:-85px; width:60px; left:" + position.toString() + "px;' id='p" + i + "'>";
		}
		if (eList[i]) {
			image = "'img/rps/" + eList[i] + ".png'";
			string += "<img src=" + image + " style='position: absolute; top:-25px; width:60px; left:" + position.toString() + "px;' id='e" + i + "'>";
		}
		position += 200;
	}
	string += "</div>";
	return string;
}

//get the next position of compare
function getCompareNext() {
	var box = document.getElementById("images");
	for (var i = 0; i < box.children.length; i++) {
		var position = parseInt(box.children[i].style.left.replace(/^\D+/g, ''));
		position -= 5;
		box.children[i].style.left = position.toString() + "px";
		if (position > 300) {
			position = 0;
		}
		switch(position) {
			case 0:
				box.children[i].style.visibility = "hidden";
				break;
			case 300:
				box.children[i].style.visibility = "visible";
				break;
			case 150:
				box.children[i].style.width = "75px";
				box.children[i].src = changeColor(box.children[i].id);
				break;
			case 120:
				box.children[i].style.width = "60px";

		}
	}
}

/*
 * change color if:
 * win: blue
 * lose: red
 * tie: greeen
 */
function changeColor(id) {
	var string = "img/rps/";
	var score;
	var index = parseInt(id.charAt(1));
	if (id.charAt(0) === "p") {
		score = wintielose(playerList[index], computerList[index]);
		string += playerList[index];
	} else {
		score = wintielose(computerList[index], playerList[index]);
		string += computerList[index];
	}
	switch(score) {
		case "win":
			string += "_blue.png";
			break;
		case "lose":
			string += "_red.png";
			break;
		case "tie":
			string += "_green.png";
			break;
	}
	return string;
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
