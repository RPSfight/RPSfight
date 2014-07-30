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

function resetDB(){
	db.transaction(initTablesHard,dbErrorHandler, dbReady);
}

function testSavePlayer(){
	var userinput;
	userinput = prompt("Enter a value to save in the 'gold' field...", "999");
	var player = {
		level:"1",
		experience:"1",
		rock_att:"1",
		rock_def:"1",
		paper_att:"1",
		paper_def:"1",
		scissors_att:"1",
		scissors_def:"1",
		max_life:"10",
		current_life:"10",
		gold:userinput, 
		gold_storage:"100",
		exp_storage:"100"
	};
	savePlayer(player);
}

function testSaveComputer(){
	var userinput;
	userinput = prompt("Enter a value to save in the 'scissors_def' field...", "999");
	var computer = {
		level:"1",
		rock_att:"1",
		rock_def:"1",
		paper_att:"1",
		paper_def:"1",
		scissors_att:"1",
		scissors_def:userinput,
		max_life:"10",
		current_life:"10",
	};
	saveComputer(computer);
}

function testLoadPlayer(){
	
	// since database transaction calls are asynchronous
	// we have to pass in a call back function that
	// load player will call once the sql query has finished
	// its execution.
	player = loadPlayer(function(player){
		// must define a callback when calling
		// load computer
		
		var results;
		results = "Player's Current Stats...\n";
		results += "level: "+player.level+"\n";
		results += "exp: "+player.experience+"\n"; 
		results += "ratt: "+player.rock_att+"\n"; 
		results += "rdef: "+player.rock_def+"\n"; 
		results += "patt: "+player.paper_att+"\n"; 
		results += "pdef: "+player.paper_def+"\n"; 
		results += "satt: "+player.scissors_att+"\n"; 
		results += "sdef: "+player.scissors_def+"\n"; 
		results += "max life: "+player.max_life+"\n"; 
		results += "cur life: "+player.current_life+"\n"; 
		results += "gold: "+player.gold+"\n";
		results += "gold storage: "+player.gold_storage+"\n";
		results += "exp storage: " +player.exp_storage+"\n";
		
		
		alert(results);  
	});
	
}

function testLoadComputer(){
	// since database transaction calls are asynchronous
	// we have to pass in a call back function that
	// load player will call once the sql query has finished
	// its execution.
	player = loadComputer(function(computer){
		// must define a callback when calling
		// load computer
		var results;
		results = "Computer's Current Stats...\n";
		results += "level: "+computer.level+"\n";
		results += "ratt: "+computer.rock_att+"\n"; 
		results += "rdef: "+computer.rock_def+"\n"; 
		results += "patt: "+computer.paper_att+"\n"; 
		results += "pdef: "+computer.paper_def+"\n"; 
		results += "satt: "+computer.scissors_att+"\n"; 
		results += "sdef: "+computer.scissors_def+"\n"; 
		results += "max life: "+computer.max_life+"\n"; 
		results += "cur life: "+computer.current_life+"\n"; 
		alert(results);  
	});
}

function savePlayer(player){
	
	var level;
	var experience;
	var rock_att;
	var rock_def;
	var paper_att;
	var paper_def;
	var scissors_att;
	var scissors_def;
	var max_life;
	var current_life;
	var gold;
	var gold_storage;
	var exp_storage;
	var query;
	
	level         = player.level;
	experience    = player.experience;
	rock_att      = player.rock_att;
	rock_def      = player.rock_def;
	paper_att     = player.paper_att;
	paper_def     = player.paper_def;
	scissors_att   = player.scissors_att;
	scissors_def   = player.scissors_def;
	max_life      = player.max_life;
	current_life  = player.current_life;
	gold          = player.gold;
	gold_storage  = player.gold_storage;
	exp_storage   = player.exp_storage;
	
	query = "update player	"+
<<<<<<< HEAD
			"set level=?, experience=?, rock_att=?, rock_def=?, paper_att=?, paper_def=?, scissor_att=?, scissor_def=?, max_life=?, current_life=?, gold=?, gold_storage=?, exp_storage=?	"+
			"where id='1'";
	
	db.transaction(function(tx){
		tx.executeSql(query,[level,experience,rock_att,rock_def,paper_att,paper_def,scissor_att,scissor_def,max_life,current_life,gold,gold_storage,exp_storage]);	
=======
			"set level=?, experience=?, rock_att=?, rock_def=?, paper_att=?, paper_def=?, scissors_att=?, scissors_def=?, max_life=?, current_life=?, gold=?	"+
			"where id='1'";
	
	db.transaction(function(tx){
		tx.executeSql(query,[level,experience,rock_att,rock_def,paper_att,paper_def,scissors_att,scissors_def,max_life,current_life,gold]);	
>>>>>>> 21405ca35c6019629d241ea9e78fb23975aa1232
	},dbErrorHandler, querySuccess);
}

function saveComputer(computer){
	var level;
	var rock_att;
	var rock_def;
	var paper_att;
	var paper_def;
	var scissors_att;
	var scissors_def;
	var max_life;
	var current_life;
	var query;
	
	level         = computer.level;
	rock_att      = computer.rock_att;
	rock_def      = computer.rock_def;
	paper_att     = computer.paper_att;
	paper_def     = computer.paper_def;
	scissors_att   = computer.scissors_att;
	scissors_def   = computer.scissors_def;
	max_life      = computer.max_life;
	current_life  = computer.current_life;
	
	query = "update computer	"+
			"set level=?, rock_att=?, rock_def=?, paper_att=?, paper_def=?, scissors_att=?, scissors_def=?, max_life=?, current_life=? "+
			"where id='1'";
			
	db.transaction(function(tx){
		tx.executeSql(query,[level,rock_att,rock_def,paper_att,paper_def,scissors_att,scissors_def,max_life,current_life]);	
	},dbErrorHandler, querySuccess);
} 

/**
 * Once the results have been retrieved, they will be stored in a
 * player object and passed onto the given call back function callBackFunction
 */
function loadPlayer(callBackFunction){
	db.transaction(function(tx){
		tx.executeSql("Select * from player where id='1'",[],
		function (tx, results){
			var row = results.rows.item(0);
			var result = {
				level:row.level,
				experience:row.experience,
				rock_att:row.rock_att,
				rock_def:row.rock_def,
				paper_att:row.paper_att,
				paper_def:row.paper_def,
				scissors_att:row.scissors_att,
				scissors_def:row.scissors_def,
				max_life:row.max_life,
				current_life:row.current_life,
				gold:row.gold,
				gold_storage:row.gold_storage,
				exp_storage:row.exp_storage
			};
			
			
			
		   //callBackFunction to execute when 
		   // we finally have the results from
		   // the sql query
		   callBackFunction(result);		
		}, dbErrorHandler);
	},dbErrorHandler,querySuccess);
}

/**
 * Once the results have been retrieved, they will be stored in a
 * computer object and passed onto the given call back function callBackFunction
 */
function loadComputer(callBackFunction){
	db.transaction(function(tx){
	tx.executeSql("Select * from computer where id='1'",[],
		function (tx, results){
			var row = results.rows.item(0);
			var result = {
				level:row.level,
				rock_att:row.rock_att,
				rock_def:row.rock_def,
				paper_att:row.paper_att,
				paper_def:row.paper_def,
				scissors_att:row.scissors_att,
				scissors_def:row.scissors_def,
				max_life:row.max_life,
				current_life:row.current_life,
			};
			
			//callBackFunction to execute when 
		    // we finally have the results from
		    // the sql query
		    callBackFunction(result);		
		}, dbErrorHandler);
	},dbErrorHandler,querySuccess);
}

function initTables(tx){
	//init tables
	tx.executeSql(initPlayerTable());
	tx.executeSql(initComputerTable());
	tx.executeSql(initComputerDefaultStatsTable());
	tx.executeSql(initExpPerLevelTable());
	
	//init default data
	// if this is the first time the app has run.
	// i.e. player, computer, etc. 
	initData(tx);
}

function initTablesHard(tx){
	//init tables
	tx.executeSql("drop table if exists player");
	tx.executeSql("drop table if exists computer");
	tx.executeSql(initPlayerTable());
	tx.executeSql(initComputerTable());
	tx.executeSql(initComputerDefaultStatsTable());
	tx.executeSql(initExpPerLevelTable());
	
	//init default data
	// if this is the first time the app has run.
	// i.e. player, computer, etc. 
	initData(tx);
}

function dbErrorHandler(e){
	alert(e.message);
}

function dbReady(){
	// tables were successfully created.
	//alert("db ready");
}

function querySuccess(){
	//query was executed successfully.
}


function finishedTest(){
	alert("finished getting test results");
}

function initData(tx){
	//defaults
	var level = 1;
	var experience = 0;
	var rock_att	= 1;
	var rock_def	= 1;
	var paper_att   = 1;
	var paper_def   = 1;
	var scissors_att = 1;
	var scissors_def = 1;
	var max_life    = 10;
	var current_life= 10;
	var gold = 101;
	
	
	// or ignore -> if data is already initialized in the table then do nothing.
	tx.executeSql("insert or ignore into player "+
				   "(id, level,experience,rock_att,rock_def,paper_att,paper_def,scissors_att,scissors_def,max_life,current_life,gold) "+
				   "values(1,?,?,?,?,?,?,?,?,?,?,?) ",
				   [level,experience,rock_att,rock_def,paper_att,paper_def,scissors_def,scissors_def,max_life,current_life,gold]);
				   
    tx.executeSql("insert or ignore into computer "+
				   "(id, level,rock_att,rock_def,paper_att,paper_def,scissors_att,scissors_def,max_life,current_life) "+
				   "values(1,?,?,?,?,?,?,?,?,?) ",
				   [level,rock_att,rock_def,paper_att,paper_def,scissors_def,scissors_def,max_life,current_life]);
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
			"	scissors_att INTEGER, 	" +
			"	scissors_def INTEGER, 	" +
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
			"	scissors_att INTEGER, 	" +
			"	scissors_def INTEGER, 	" +
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
			"	scissors_att INTEGER, 	" +
			"	scissors_def INTEGER, 	" +
			"	max_life INTEGER,		" +
			"	current_life INTEGER, 	" +
			"	gold INTEGER,			" +
			"   gold_storage INTEGER,   " +
			"   exp_storage INTEGER     " + 
			") ";
	
	return result;
}