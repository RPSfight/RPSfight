function initFight(eMove, pMove) {
	var computer_avg_def = (computerData.rock_def + computerData.scissor_def + computerData.paper_def) / 10;
	var player_avg_def = (playerData.rock_def + playerData.scissor_def + playerData.paper_def) / 10;
	switch(pMove) {
		case "rock":
			switch(eMove) {
				case "rock":
					break;
				case "paper":
					playerData.current_life -= computerData.paper_att * computerData.paper_att / playerData.rock_def;
					break;
				case "scissors":
					computerData.current_life -= playerData.rock_att * playerData.rock_att / computerData.scissor_def;
					break;
				default:
					computerData.current_life -= playerData.rock_att * playerData.rock_att / computer_avg_def;
			}
			break;
		case "paper":
			switch(eMove) {
				case "paper":
					break;
				case "scissors":
					playerData.current_life -= computerData.scissor_att * computerData.scissor_att / playerData.paper_def;
					break;
				case "rock":
					computerData.current_life -= playerData.paper_att * playerData.paper_att / computerData.rock_def;
					break;
				default:
					computerData.current_life -= playerData.paper_att * playerData.paper_att / computer_avg_def;
			}
			break;
		case "scissors":
			switch(eMove) {
				case "rock":
					playerData.current_life -= computerData.rock_att * computerData.rock_att / playerData.scissor_def;
					break;
				case "scissors":
					break;
				case "paper":
					computerData.current_life -= playerData.scissor_att * playerData.scissor_att / computerData.paper_def;
					break;
				default:
					computerData.current_life -= playerData.scissor_att * playerData.scissor_att / computer_avg_def;
			}
			break;
		default:
			switch(eMove) {
				case "rock":
					playerData.current_life -= computerData.rock_att * computerData.rock_att / player_avg_def;
					break;
				case "scissors":
					playerData.current_life -= computerData.scissor_att * computerData.scissor_att / player_avg_def;
					break;
				case "paper":
					playerData.current_life -= computerData.paper_att * computerData.paper_att / player_avg_def;
					break;
			}
	}
}

