var difficulty;

function initFight(eMove, pMove) {
	var computer_avg_def = (computerData.rock_def + computerData.scissors_def + computerData.paper_def) / 10;
	var player_avg_def = (playerData.rock_def + playerData.scissors_def + playerData.paper_def) / 10;
	switch(wintielose(pMove,eMove)) {
		case "win":
			if (eMove) {
				computerData.current_life -= playerData[pMove + "_att"] * playerData[pMove + "_att"] / (computerData[eMove + "_def"] * difficulty);
			} else {
				computerData.current_life -= playerData[pMove + "_att"] * playerData[pMove + "_att"] / (computer_avg_def * difficulty);
			}
			break;
		case "lose":
			if (pMove) {
				playerData.current_life -= computerData[eMove + "_att"] * computerData[eMove + "_att"] * difficulty * difficulty / playerData[pMove + "_def"];
			} else {
				playerData.current_life -= computerData[eMove + "_att"] * computerData[eMove + "_att"] * difficulty * difficulty / player_avg_def;
			}
			break;
		case "tie":
			computerData.current_life -= playerData[pMove + "_att"] * playerData[pMove + "_att"] / (computerData[eMove + "_def"] * difficulty);
			playerData.current_life -= computerData[eMove + "_att"] * computerData[eMove + "_att"] * difficulty * difficulty / playerData[pMove + "_def"];
	}
	if(computerData.current_life<0){
		computerData["current_life"]=0;
	}
	if(playerData.current_life<0){
		playerData["current_life"]=0;
	}
}

function setDifficulty(text) {
	switch(text.toLowerCase()) {
		case "easy":
			difficulty = 1;
			break;
		case "medium":
			difficulty = 2;
			break;
		case "hard":
			difficulty = 3;
			break;

	}
}

