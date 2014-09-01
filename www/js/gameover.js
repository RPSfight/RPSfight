var reward = {
	win : 1,
	tie : 10,
	lose : 100
};

var reward1 = {
	easy : 1,
	medium : 1.5,
	hard : 2
};

function initGameover(result) {
	$("#result").popup("open");
	if (result === "win") {
		unlockDifficulity();
	}
	var gold = Math.round(computerData.gold_reward / reward[result] * reward1[computerData.difficulty.toLowerCase()]);
	var exp = Math.round(computerData.exp_reward / reward[result] * reward1[computerData.difficulty.toLowerCase()]);
	var orgGold = playerData.gold;
	var orgExp = playerData.experience;
	playerData.gold += gold;
	playerData.experience += exp;
	if (playerData.gold > playerData.gold_storage) {
		playerData.gold = playerData.gold_storage;
	}
	if (playerData.experience > playerData.exp_storage) {
		playerData.experience = playerData.exp_storage;
	}
	savePlayer(playerData);
	$("#resultImg").attr("src", "img/background/" + result + ".png");
	$("#gold").text(orgGold + "/" + playerData.gold_storage);
	$("#exp").text(orgExp + "/" + playerData.exp_storage);
	setTimeout(function() {
		$("#gold").text("+ " + gold + "/" + playerData.gold_storage);
		$("#exp").text("+ " + exp + "/" + playerData.exp_storage);
	}, 1000);
	setTimeout(function() {
		$("#gold").text(playerData.gold + "/" + playerData.gold_storage);
		$("#exp").text(playerData.experience + "/" + playerData.exp_storage);
	}, 2000);
}

function unlockDifficulity() {
	loadComputerDefaultStatsTable(computerData.level, function(stats) {
		if (stats.medium_lock === 1) {
			stats["medium_lock"] = 0;
		} else if (stats.hard_lock === 1 && computerData.difficulty.toLowerCase() === "medium") {
			stats["hard_lock"] = 0;
		}
		saveComputerDefaultStats(stats);
	});
	if (computerData.level === playerData.current_computer_level) {
		playerData["current_computer_level"]++;
		savePlayer(playerData);
		alert("New Level Has Been Unlock");
	}
}
