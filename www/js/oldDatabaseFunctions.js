// print the contents of the given database
function printDB(){
	db.transaction(getTestResults,dbErrorHandler,finishedTest);
}

// get test result data
function getTestResults(tx){
	tx.executeSql("Select * from exp_per_level",[],printExpTestResults,dbErrorHandler);
	tx.executeSql("Select * from comp_def_stats",[],printCompDefTestResults,dbErrorHandler);
	tx.executeSql("Select * from computer",[],printCompTestResults,dbErrorHandler);
	tx.executeSql("Select * from player",[],printPlayerTestResults,dbErrorHandler);
}


// print exp_per_level test results
function printExpTestResults(tx, results){
	if(results.rows.length == 0){
		// alert("no data in exp_per_level table");
		document.getElementById("exp_per_level_results").innerHTML="no data in exp_per_level table";
		return false;
	}
	
	var result = "Exp_Per_Level: \n";
	var item;
	for(var i=0; i<results.rows.length; i++){
		row = results.rows.item(i);
		result=result+"	level: "+row.level+"\n"+
				      " req_exp: "+row.req_exp+"\n";
	}
	// alert(result);
	document.getElementById("exp_per_level_results").innerHTML=result;
}

// print comp_def_stats test results
function printCompDefTestResults(tx, results){
	if(results.rows.length == 0){
		// alert("no data in comp_def_stats table");
		document.getElementById("comp_def_stats_results").innerHTML="no data in comp_def_stats table";
		return false;
	}
	
	var result = "";
	for(var i=0; i<results.rows.length; i++){
		row = results.rows.item(i);
		result=result+"	level: "+row.level+"\n"+
				      " rock_att: "+row.rock_att+"\n"+
				      " rock_def: "+row.rock_def+"\n"+
				      " paper_att: "+row.paper_att+"\n"+
				      " paper_def: "+row.paper_def+"\n"+
				      " scissor_att: "+row.scissor_att+"\n"+
				      " scissor_def: "+row.scissor_def+"\n"+
				      " life: "+row.life+"\n";
	}
	// alert(result);
	document.getElementById("comp_def_stats_results").innerHTML=result;
}

// print computer test results
function printCompTestResults(tx, results){
	if(results.rows.length == 0){
		// alert("no data in computer table");
		document.getElementById("computer_table_results").innerHTML="no data in computer table";
		return false;
	}
	
	var result = "";
	for(var i=0; i<results.rows.length; i++){
		row = results.rows.item(i);
		result=result+"	id: "+row.id+"\n"+
					  "	level: "+row.level+"\n"+
				      " rock_att: "+row.rock_att+"\n"+
				      " rock_def: "+row.rock_def+"\n"+
				      " paper_att: "+row.paper_att+"\n"+
				      " paper_def: "+row.paper_def+"\n"+
				      " scissor_att: "+row.scissor_att+"\n"+
				      " scissor_def: "+row.scissor_def+"\n"+
				      " max_life: "+row.max_life+"\n"+
				      " current_life: "+row.current_life+"\n";
	}
	// alert(result);
	document.getElementById("computer_table_results").innerHTML=result;
}

//print player test results
function printPlayerTestResults(tx, results){
	if(results.rows.length == 0){
		// alert("no data in the player table");
		document.getElementById("player_table_results").innerHTML="no data in player table";
		return false;
	}
	
	var result = "[<br/>";
	for(var i=0; i<results.rows.length; i++){
		row = results.rows.item(i);
		result=result+"{<br/>"+
					  "		id: "+row.id+"<br/>"+
					  "		level: "+row.level+"<br/>"+
					  "		experience: "+row.experience+"<br/>"+
				      " 	rock_att: "+row.rock_att+"<br/>"+
				      " 	rock_def: "+row.rock_def+"<br/>"+
				      " 	paper_att: "+row.paper_att+"<br/>"+
				      " 	paper_def: "+row.paper_def+"<br/>"+
				      " 	scissor_att: "+row.scissor_att+"<br/>"+
				      " 	scissor_def: "+row.scissor_def+"<br/>"+
				      " 	max_life: "+row.max_life+"<br/>"+
				      " 	current_life: "+row.current_life+"<br/>"+
				      " 	gold: "+row.gold+"<br/>"+
				      "}";		
	}
	result = result+"<br/>]";
	// alert(result);
	document.getElementById("player_table_results").innerHTML=result;
}
