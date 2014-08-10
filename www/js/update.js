var playerData;
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
				"top" : "-240px",
				"left" : "280px",
			});
			break;
		default:
			$("#attdef").css({
				"top" : "auto",
				"left" : "auto",
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

function updateLevel(element){
	
}
