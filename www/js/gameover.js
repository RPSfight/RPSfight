function initGameover() {
	$("#resultImg").attr("src", "img/background/" + getQuery("result") + ".png");
	setTimeout(function(){
		$("#gold").append("<img src='img/rps/gold.png'> <span>+"+getQuery("gold")+"</span>");
		$("#exp").append("<img src='img/rps/exp.png'> <span>+"+getQuery("exp")+"</span>");
	},500);
	setTimeout(function(){
		$("#gold").append("<span> --> </span>");
		$("#exp").append("<span> --> </span>");
	},1000);
	setTimeout(function(){
		$("#gold").append("<img src='img/rps/gold.png'> <span>"+getQuery("tgold")+"</span>");
		$("#exp").append("<img src='img/rps/exp.png'> <span>"+getQuery("texp")+"</span>");
	},1500);
	
	setTimeout(function(){
		$("#ok").append("<a href='#' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b' onclick='redirect()'>OK</a>");
	},2000);
}

function redirect(){
	window.location="world.html";
}
