var playerData;
function initUpdate() {
	initDB();
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();
	loadPlayer(function(pd) {
		playerData=pd;
		$("#experience").text(pd.experience+"/"+pd.exp_storage);
		$("#gold").text(pd.gold+"/"+pd.gold_storage);
		$("#exp_storage").text(pd.exp_storage);
		$("#gold_storage").text(pd.gold_storage);
		$("#exp_storage_cost").text(" Cost Gold: "+pd.exp_storage);
		$("#gold_storage_cost").text(" Cost Gold: "+pd.gold_storage);
		$("#paper_att").text(pd.paper_att);
		$("#paperATT_cost").text(" Cost Exp. "+pd.paper_att*100);
		$("#paper_def").text(pd.paper_def);
		$("#paperDEF_cost").text(" Cost Exp. "+pd.paper_def*100);
		$("#rock_att").text(pd.rock_att);
		$("#rockATT_cost").text(" Cost Exp. "+pd.rock_att*100);
		$("#rock_def").text(pd.rock_def);
		$("#rockDEF_cost").text(" Cost Exp. "+pd.rock_def*100);
		$("#scissors_att").text(pd.scissors_att);
		$("#scissorsATT_cost").text(" Cost Exp. "+pd.scissors_att*100);
		$("#scissors_def").text(pd.scissors_def);
		$("#scissorsDEF_cost").text(" Cost Exp. "+pd.scissors_def*100);
	});
}

function doOnOrientationChange() {
	switch(window.orientation) {
		case -90:
		case 90:
			$("#attdef").css({
				"top" : "-260px",
				"left" : "300px",
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

function updatePower(element){
	var id=$(element).prev().attr('id');
	var currentAmount=playerData[id];
	if(playerData.experience>=currentAmount*100){
		playerData.experience-=currentAmount*100;
		playerData[id]+=2;
		savePlayer(playerData);
		$("#"+id).text(playerData[id]);
		$(element).next().text(" Cost Exp. "+playerData[id]*100);
		$("#experience").text(playerData.experience+"/"+playerData.exp_storage);
	}else{
		alert("Not Enough Exp");
	}
}

function updateExpGold(element){
	var id=$(element).prev().attr('id');
	var currentAmount=playerData[id];
	if(playerData.gold>=currentAmount){
		playerData.gold-=currentAmount;
		playerData[id]+=1000;
		savePlayer(playerData);
		$("#"+id).text(playerData[id]);
		$(element).next().text(" Cost Gold. "+playerData[id]);
		$("#gold").text(playerData.gold+"/"+playerData.gold_storage);
	}else{
		alert("Not Enough Gold");
	}
}
