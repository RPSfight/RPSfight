var reward = {
	win : 1,
	tie : 10,
	lose : 100
};

function initGameover(result) {
	$("#result").popup("open");
	var gold = computerData.gold_reward / reward[result];
	var exp = computerData.exp_reward / reward[result];
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
	$("#picture").click();
	$("#gold").text(orgGold + "/" + playerData.gold_storage);
	$("#exp").text(orgExp + "/" + playerData.exp_storage);
	setTimeout(function() {
		$("#gold").text("+" + computerData.gold_reward / reward[result] + "/" + playerData.gold_storage);
		$("#exp").text("+" + computerData.exp_reward / reward[result] + "/" + playerData.exp_storage);
	}, 1000);
	setTimeout(function() {
		$("#gold").text(playerData.gold + "/" + playerData.gold_storage);
		$("#exp").text(playerData.experience + "/" + playerData.exp_storage);
	}, 2000);
}

