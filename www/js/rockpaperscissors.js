/**
 * @author Junxin
 */

/* Rock===Punch
 * Paper===Head
 * Scissors===Kick
 * Punch>Kick
 * Head>Punch
 * Kick>Head
 */
var player = new Array();
var computer = new Array();
var kick = ["Kick1.png", "Kick2.png"];
var kickback = ["Kick1.png", "Ready.png"];
var punch = ["Punch1.png", "Punch2.png"];
var punchback = ["Punch1.png", "Ready.png"];
var head = ["Head1.png", "Head2.png"];
var headback = ["Head1.png", "Ready.png"];
var hurt = ["Death1.png", "Ready.png"];
var death = ["Death1.png", "Death2.png"];
var dead = ["Death2.png", "Death2.png"];
var victory = ["Ready.png", "Victory.png"];
var ready = ["Ready.png", "Ready.png"];

//get player move array
function getPlayer() {
	return player;
}

//get computer move array
function getComputer() {
	return computer;
}

//init array list for images
function initRPS(eList, pList) {
	player = new Array();
	computer = new Array();

	switch(pList) {
		case "rock":
			player = player.concat(punch);
			switch(eList) {
				case "scissors":
					player = player.concat(punchback);
					computer = computer.concat(kick);
					computer = computer.concat(hurt);
					break;
				case "rock":
					player = player.concat(punchback);
					computer = computer.concat(punch);
					computer = computer.concat(punchback);
					break;
				case "paper":
					player = player.concat(hurt);
					computer = computer.concat(head);
					computer = computer.concat(headback);
					break;
				default:
					player = player.concat(punchback);
					computer = computer.concat(ready);
					computer = computer.concat(hurt);
			}
			break;
		case "paper":
			player = player.concat(head);
			switch(eList) {
				case "scissors":
					player = player.concat(hurt);
					computer = computer.concat(kick);
					computer = computer.concat(kickback);
					break;
				case "rock":
					player = player.concat(headback);
					computer = computer.concat(punch);
					computer = computer.concat(hurt);
					break;
				case "paper":
					player = player.concat(headback);
					computer = computer.concat(head);
					computer = computer.concat(headback);
					break;
				default:
					player = player.concat(headback);
					computer = computer.concat(ready);
					computer = computer.concat(hurt);
			}
			break;
		case "scissors":
			player = player.concat(kick);
			switch(eList) {
				case "scissors":
					player = player.concat(kickback);
					computer = computer.concat(kick);
					computer = computer.concat(kickback);
					break;
				case "rock":
					player = player.concat(hurt);
					computer = computer.concat(punch);
					computer = computer.concat(punchback);
					break;
				case "paper":
					player = player.concat(kickback);
					computer = computer.concat(head);
					computer = computer.concat(hurt);
					break;
				default:
					player = player.concat(kickback);
					computer = computer.concat(ready);
					computer = computer.concat(hurt);
			}
			break;
		default:
			player = player.concat(ready);
			player = player.concat(hurt);
			switch(eList) {
				case "rock":
					computer = computer.concat(punch);
					computer = computer.concat(punchback);
					break;
				case "paper":
					computer = computer.concat(head);
					computer = computer.concat(headback);
					break;
				case "scissors":
					computer = computer.concat(kick);
					computer = computer.concat(kickback);
					break;
			}
	}

}

