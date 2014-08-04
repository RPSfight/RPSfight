function popupwindow(message) {
	$("#message").popup("open").show();
	$("#message").text(message);
	setTimeout(
		function(){
			$("#message").hide().popup("close").empty();
		},2000
	);
}
