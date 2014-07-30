function initUpdate() {
	initDB();
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();
	loadPlayer(function(playerData) {
		$("#exp").text(playerData.experience+"/"+playerData.exp_storage);
		$("#gold").text(playerData.gold+"/"+playerData.gold_storage);
		$("#exp_storage").text(playerData.exp_storage+"/1000");
		$("#gold_storage").text(playerData.gold_storage+"/1000");
		$("#exp_storage_cost").text(" Cost Gold: "+playerData.exp_storage);
		$("#gold_storage_cost").text(" Cost Gold: "+playerData.gold_storage);
		$("#paperATT").text(playerData.paper_att);
		$("#paperATT_cost").text(" Cost Exp. "+playerData.paper_att*100);
		$("#paperDEF").text(playerData.paper_def);
		$("#paperDEF_cost").text(" Cost Exp. "+playerData.paper_def*100);
		$("#rockATT").text(playerData.rock_att);
		$("#rockATT_cost").text(" Cost Exp. "+playerData.rock_att*100);
		$("#rockDEF").text(playerData.rock_def);
		$("#rockDEF_cost").text(" Cost Exp. "+playerData.rock_def*100);
		$("#scissorsATT").text(playerData.scissors_att);
		$("#scissorsATT_cost").text(" Cost Exp. "+playerData.scissors_att*100);
		$("#scissorsDEF").text(playerData.scissors_def);
		$("#scissorsDEF_cost").text(" Cost Exp. "+playerData.scissors_def*100);
	});
}

function doOnOrientationChange() {
	switch(window.orientation) {
		case -90:
		case 90:
			$("#attdef").css({
				"top" : "-180px",
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