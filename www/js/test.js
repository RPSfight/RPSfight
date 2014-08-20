var posiX=[];
var posiY=[];

function initTest() {
	document.getElementById("rps").addEventListener("touchstart", touchstart, false);
}

function touchstart(e) {
	e.preventDefault();
	document.getElementById("rps").addEventListener("touchmove", function() {
		posiX.push(document.elementFromPoint(e.touches[0].pageX,e.touches[0].pageY).id);
	});
}

function show(){
	alert(posiX);
	posiX.length=0;
	alert(posiX);
}
