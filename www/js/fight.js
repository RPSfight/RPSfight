var diffculty;

function initFight(eMove, pMove) {
	var computer_avg_def = (computerData.rock_def + computerData.scissors_def + computerData.paper_def) / 10;
	var player_avg_def = (playerData.rock_def + playerData.scissors_def + playerData.paper_def) / 10;
	switch(wintielose(pMove,eMove)) {
		case "win":
			if (eMove) {
				computerData.current_life -= playerData[pMove + "_att"] * playerData[pMove + "_att"] / (computerData[eMove + "_def"] * diffculty);
			} else {
				computerData.current_life -= playerData[pMove + "_att"] * playerData[pMove + "_att"] / (computer_avg_def * diffculty);
			}
			break;
		case "lose":
			if (pMove) {
				playerData.current_life -= computerData[eMove + "_att"] * computerData[eMove + "_att"] * diffculty * diffculty / playerData[pMove + "_def"];
			} else {
				playerData.current_life -= computerData[eMove + "_att"] * computerData[eMove + "_att"] * diffculty * diffculty / player_avg_def;
			}
			break;
		case "tie":
			computerData.current_life -= playerData[pMove + "_att"] * playerData[pMove + "_att"] / (computerData[eMove + "_def"] * diffculty);
			playerData.current_life -= computerData[eMove + "_att"] * computerData[eMove + "_att"] * diffculty * diffculty / playerData[pMove + "_def"];
	}
}

function setDiffculty(text) {
	switch(text) {
		case "Easy":
			diffculty = 1;
			break;
		case "Medium":
			diffculty = 2;
			break;
		case "Hard":
			diffculty = 3;
			break;

	}
}

