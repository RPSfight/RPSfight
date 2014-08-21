var playerData;
var levelData;
function initUpdate() {
	initDB();
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();
	loadPlayer(function(pd) {
		playerData = pd;
		refresh();
	});
}

function doOnOrientationChange() {
	switch(window.orientation) {
		case -90:
		case 90:
			$("#attdef").css({
				"top" : "-255px",
				"left" : "280px",
			});
			$("#page").css({
				"width" : "568px"
			});
			break;
		default:
			$("#attdef").css({
				"top" : "auto",
				"left" : "auto",
			});
			$("#page").css({
				"width" : "320px"
			});
			break;
	}
}

function refresh() {
	$("#experience").text(playerData.experience + "/" + playerData.exp_storage);
	$("#gold").text(playerData.gold + "/" + playerData.gold_storage);
	$("#exp_storage").text(playerData.exp_storage);
	$("#gold_storage").text(playerData.gold_storage);
	$("#exp_storage_cost").text(" Cost Gold: " + playerData.exp_storage);
	$("#gold_storage_cost").text(" Cost Gold: " + playerData.gold_storage);
	$("#paper_att").text(playerData.paper_att);
	$("#paperATT_cost").text(" Cost Exp. " + playerData.paper_att * 100);
	$("#paper_def").text(playerData.paper_def);
	$("#paperDEF_cost").text(" Cost Exp. " + playerData.paper_def * 100);
	$("#rock_att").text(playerData.rock_att);
	$("#rockATT_cost").text(" Cost Exp. " + playerData.rock_att * 100);
	$("#rock_def").text(playerData.rock_def);
	$("#rockDEF_cost").text(" Cost Exp. " + playerData.rock_def * 100);
	$("#scissors_att").text(playerData.scissors_att);
	$("#scissorsATT_cost").text(" Cost Exp. " + playerData.scissors_att * 100);
	$("#scissors_def").text(playerData.scissors_def);
	$("#scissorsDEF_cost").text(" Cost Exp. " + playerData.scissors_def * 100);
	$("#level").text(playerData.level);
	$("#max_life").text(playerData.max_life);
	$("#max_life_cost").text(" Cost Exp. " + playerData.max_life * 10);
	loadPlayerLevelUpInfo(playerData.level + 1, function(info) {
		levelData = info;
		$("#level_cost").text(" Cost Exp: " + levelData.req_exp);
	});
}

function updatePower(element) {
	var id = $(element).prev().attr('id');
	var currentAmount = playerData[id];
	if (playerData.experience >= currentAmount * 100) {
		playerData.experience -= currentAmount * 100;
		playerData[id] += 2;
		savePlayer(playerData);
		refresh();
	} else {
		$("#textInfo1").text("Not Enough Experience");
		$("#message").popup("open");
	}
}

function updateExpGold(element) {
	var id = $(element).prev().attr('id');
	var currentAmount = playerData[id];
	if (playerData.gold >= currentAmount) {
		playerData.gold -= currentAmount;
		playerData[id] += 1000;
		savePlayer(playerData);
		refresh();
	} else {
		$("#textInfo1").text("Not Enough Gold");
		$("#message").popup("open");
	}
}

function updateLife(element) {
	var id = $(element).prev().attr('id');
	var currentAmount = playerData[id];
	if (playerData.experience >= currentAmount * 10) {
		playerData.experience -= currentAmount * 10;
		playerData[id] += 2;
		savePlayer(playerData);
		refresh();
	} else {
		$("#textInfo1").text("Not Enough Experience");
		$("#message").popup("open");
	}
}

function updateLevel(element) {
	var id = $(element).prev().attr('id');
	if (playerData.experience >= levelData.req_exp) {
		playerData.experience -= levelData.req_exp;
		playerData.level++;
		playerData.rock_att += levelData.rock_att_boost;
		playerData.rock_def += levelData.rock_def_boost;
		playerData.paper_att += levelData.paper_att_boost;
		playerData.paper_def += levelData.paper_def_boost;
		playerData.scissors_att += levelData.scissors_att_boost;
		playerData.scissors_def += levelData.scissors_def_boost;
		savePlayer(playerData);
		refresh();
	} else {
		$("#textInfo1").text("Not Enough Experience");
		$("#message").popup("open");
	}
}
