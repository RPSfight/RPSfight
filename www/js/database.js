/**
 * @author johng
 * 
 * Creates the playerifno table when the application is first run,
 * once the database is ready, the players' health counts are
 * loaded onto the screen.
 */
var db;

function initDB(){
	//init database
	db = window.openDatabase("RPSFight","1.0","RPSFight Database",1000000);
	db.transaction(initTables,dbErrorHandler, dbReady);
}

// print the contents of the given database
function printDB(){
	db.transaction(getTestResults,dbErrorHandler,finishedTest);
}

function generateTestData(){
	db.transaction(insertTestData,dbErrorHandler,finishedTest);
}

function savePlayer(player){
	
	var person = {
				    level:"1";
				    experience:"123;
				    paper_att:"1";
				    paper_def:"1";
				    ...
				    gold:"123123123";
				 };
				 
	tx.executeSql("insert  into player(level,....,gold) values(?,...,?)",[level,....,gold],printExpTestResults,dbErrorHandler);			 
				 
	
}

function saveComputer(computer){
	
}

function loadPlayer(){
	//....
	return result;
}

function loadComputer(){
	//....
	return result;
}

function initTables(tx){
	//init tables
	tx.executeSql(initPlayerTable());
	tx.executeSql(initComputerTable());
	tx.executeSql(initComputerDefaultStatsTable());
	tx.executeSql(initExpPerLevelTable());
}

function dbErrorHandler(e){
	alert(e.message);
}

function dbReady(){
	// tables were successfully created.
	alert("db ready");
	generateTestData();
}


function finishedTest(){
	alert("finished getting test results");
}

// get test result data
function getTestResults(tx){
	tx.executeSql("Select * from exp_per_level",[],printExpTestResults,dbErrorHandler);
	tx.executeSql("Select * from comp_def_stats",[],printCompDefTestResults,dbErrorHandler);
	tx.executeSql("Select * from computer",[],printCompTestResults,dbErrorHandler);
	tx.executeSql("Select * from player",[],printPlayerTestResults,dbErrorHandler);
}

function insertTestData(tx){
	
	//defaults
	var level = 1;
	var experience = 0;
	var rock_att	= 1;
	var rock_def	= 1;
	var paper_att   = 1;
	var paper_def   = 1;
	var scissor_att = 1;
	var scissor_def = 1;
	var max_life    = 1;
	var current_life= 1;
	var gold = 100;
	
	tx.executeSql("insert into player "+
				   "(level,experience,rock_att,rock_def,paper_att,paper_def,scissor_att,scissor_def,max_life,current_life,gold) "+
				   "values(?,?,?,?,?,?,?,?,?,?,?) ",
				   [level,experience,rock_att,rock_def,paper_att,paper_def,scissor_def,scissor_def,max_life,current_life,gold]);
				   
    tx.executeSql("insert into computer "+
				   "(level,rock_att,rock_def,paper_att,paper_def,scissor_att,scissor_def,max_life,current_life) "+
				   "values(?,?,?,?,?,?,?,?,?) ",
				   [level,rock_att,rock_def,paper_att,paper_def,scissor_def,scissor_def,max_life,current_life]);
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


//returns query to initialize the Exp_Per_Level table
// holds the amount experience required to reach a given level
// i.e level 1 - 0 exp
//     level 2 - 100 exp
//     level 3 - 150 exp
//     etc.
function initExpPerLevelTable(){
	var result;
	result = "create table if not exists exp_per_level " +
			"( " +
			"	level INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"	req_exp INTEGER			" +
			") ";
	
	return result;	
}

//returns query to initialize the ComputerDefaultStats
// holds the default stats for a computer at a given level.
// i.e. level 1 computer has 1 rock att, 1 rock def,...
//      level 2 computer has 1.5 rock att, 1.5 rock def,...
//		etc...
function initComputerDefaultStatsTable(){
	var result;
	result = "create table if not exists comp_def_stats " +
			"( " +
			"	level INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"	rock_att INTEGER, 		" +
			"	rock_def INTEGER, 		" +
			"	paper_att INTEGER, 		" +
			"	paper_def INTEGER, 		" +
			"	scissor_att INTEGER, 	" +
			"	scissor_def INTEGER, 	" +
			"	life INTEGER			" +
			") ";
	
	return result;
}

//return query to initialize the computer table
function initComputerTable(){
	var result;
	result = "create table if not exists computer " +
			"( " +
			"	id INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"	level INTEGER, 			" +
			"	rock_att INTEGER, 		" +
			"	rock_def INTEGER, 		" +
			"	paper_att INTEGER, 		" +
			"	paper_def INTEGER, 		" +
			"	scissor_att INTEGER, 	" +
			"	scissor_def INTEGER, 	" +
			"	max_life INTEGER,		" +
			"	current_life INTEGER  	" +
			") ";
	
	return result;
}

//returns query to initialize the player table
function initPlayerTable(){
	var result;
	result = "create table if not exists player " +
			"( " +
			"	id INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"	level INTEGER, 			" +
			"	experience INTEGER, 	" +
			"	rock_att INTEGER, 		" +
			"	rock_def INTEGER, 		" +
			"	paper_att INTEGER, 		" +
			"	paper_def INTEGER, 		" +
			"	scissor_att INTEGER, 	" +
			"	scissor_def INTEGER, 	" +
			"	max_life INTEGER,		" +
			"	current_life INTEGER, 	" +
			"	gold INTEGER			" +
			") ";
	
	return result;
}
