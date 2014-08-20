function initGameover() {
	$("#resultImg").attr("src", "img/background/" + getQuery("result") + ".png");
	setTimeout(function(){
		$("#gold").append("<img src='img/rps/gold.png'> <span>+"+getQuery("gold")+"</span> ");
		$("#exp").append("<img src='img/rps/exp.png'> <span>+"+getQuery("exp")+"</span> ");
	},500);
	setTimeout(function(){
		$("#gold").append(" <img src='img/rps/plus.png' style=' -ms-transform: rotate(90deg);-webkit-transform: rotate(90deg);transform: rotate(90deg)'> ");
		$("#exp").append(" <img src='img/rps/plus.png' style=' -ms-transform: rotate(90deg);-webkit-transform: rotate(90deg);transform: rotate(90deg)'> ");
	},1000);
	setTimeout(function(){
		$("#gold").append(" <img src='img/rps/gold.png'> <span>"+getQuery("tgold")+"</span>");
		$("#exp").append(" <img src='img/rps/exp.png'> <span>"+getQuery("texp")+"</span>");
	},1500);
	
	setTimeout(function(){
		$("#ok").append("<a href='#' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b' onclick='replay()'>Replay</a>");
		$("#ok").append("<a href='#' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b' onclick='redirect()'>Back to World</a>");
	},2000);
}

function redirect(){
	window.location="world.html";
}

function replay(){
	window.location="main.html?level="+getQuery("level")+"&diffculty="+getQuery("diffculty");
}
