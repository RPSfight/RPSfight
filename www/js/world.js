var level;
function initWorld(){
	for(var i=1; i<25; i++){
		$("#greeceText").append("<a href='#popup' data-rel='dialog' data-transition='pop' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b level' onclick='setlevel(this.innerHTML)'>"+i+"</a>");
	}
	
	for(var i=25; i<49; i++){
		$("#chinaText").append("<a href='#popup' data-rel='dialog' data-transition='pop' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b level' onclick='setlevel(this.innerHTML)'>"+i+"</a>");
	}
	
	for(var i=49; i<73; i++){
		$("#japanText").append("<a href='#popup' data-rel='dialog' data-transition='pop' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b level' onclick='setlevel(this.innerHTML)'>"+i+"</a>");
	}
}

function setlevel(text){
	level=text;
}

function goMain(diffculty){
	window.location="main.html?level="+level+"&diffculty="+diffculty;
}
