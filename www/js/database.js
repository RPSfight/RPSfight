/**n""
 * @author johng
 * 
 * Creates the playerifno table when the application is first run,
 * once the database is ready, the players' health counts are
 * loaded onto the screen.
 */
var db;
var player_columns;
var computer_columns;
var playerLevelUpInfo_columns;
var computerDefStats_columns;

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
		experience:"999",
		current_computer_level:"1",
		rock_att:"1",
		rock_def:"1",
		paper_att:"1",
		paper_def:"1",
		scissors_att:"1",
		scissors_def:"1",
		max_life:"10",
		current_life:"10",
		gold:userinput, 
		gold_storage:"1000",
		exp_storage:"1000",
		color:"bronze",
		character:"knight"
	};
	
	savePlayer(player);
	
}

function testSaveComputer(){
	var userinput;
	userinput = prompt("Enter a value to save in the 'scissors_def' field...", "999");
	var computer = {
		level:"1",
		difficulty:"easy",
		rock_att:"1",
		rock_def:"1",
		paper_att:"1",
		paper_def:"1",
		scissors_att:"1",
		scissors_def:userinput,
		max_life:"10",
		current_life:"10",
		gold_reward:"200",
		exp_reward:"100",
		color:"bronze",
		character:"knight"
	};
	saveComputer(computer);
}

function testSaveComputerDefStats(){
	var level_toedit;
	var gold_reward;
	level_toedit = prompt("Specify a level to edit", "13");
	if(level_toedit > 0 && level_toedit<97){
		gold_reward = prompt("Specify a value to save in the 'gold_reward' field...", "403");
		
		var stats = {
			level		:level_toedit,
			medium_lock :1,
			hard_lock   :1,   
			rock_att	:level_toedit,       
			rock_def	:level_toedit,       
			paper_att	:level_toedit,   
			paper_def	:level_toedit,   
			scissors_att:level_toedit,       
			scissors_def:level_toedit,       
			life		:level_toedit*10,          
			gold_reward :gold_reward,       
			exp_reward  :level_toedit*100,        
			color       :"bronze",
			character   :"knight"          
		};
		
		saveComputerDefaultStats(stats);
    }
    else{
    	alert("invalid input");
	}    
}

function testSavePlayerLevelUpInfo(){
	var level_toedit;
	var scissor_def_boost;
	level_toedit = prompt("Specify a level to edit", "7");
	if(level_toedit > 1 && level_toedit<21){
		scissor_def_boost = prompt("Specify a value to save in the 'scissors_def_bost' field...", "403");
		
		var info = {
			level				:level_toedit,
			req_exp				:level_toedit*100,   
			rock_att_boost		:level_toedit,       
			rock_def_boost		:level_toedit,       
			paper_att_boost		:level_toedit,   
			paper_def_boost		:level_toedit,   
			scissors_att_boost	:level_toedit,       
			scissors_def_boost	:scissor_def_boost      
		};
		
		savePlayerLevelUpInfo(info);
    }
    else{
    	alert("invalid input");
	}    
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
		results += "current comp level: " +player.current_computer_level+"\n";
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
		results += "color: " +player.color+"\n";
		results += "character: " +player.character+"\n";
		
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
		results += "difficulty: "+computer.difficulty+"\n";
		results += "ratt: "+computer.rock_att+"\n"; 
		results += "rdef: "+computer.rock_def+"\n"; 
		results += "patt: "+computer.paper_att+"\n"; 
		results += "pdef: "+computer.paper_def+"\n"; 
		results += "satt: "+computer.scissors_att+"\n"; 
		results += "sdef: "+computer.scissors_def+"\n"; 
		results += "max life: "+computer.max_life+"\n"; 
		results += "cur life: "+computer.current_life+"\n"; 
		results += "gold reward: "+computer.gold_reward+"\n"; 
		results += "exp reward: "+computer.exp_reward+"\n"; 
		results += "color: "+computer.color+"\n"; 
		results += "character: "+computer.character+"\n"; 
		

		
		alert(results);  
	});
}

function testLoadComputerDefStats(){
	var level;
	level = prompt("Specify a level to view", "13");
	if(level > 0 && level < 97){
		stats = loadComputerDefaultStatsTable(level,function(stats){
			
			var results;
			results = "Comuter Default Stats: \n";
			results += "level: "+stats.level		  +"\n";
			results += "medium_lock"+stats.medium_lock +"\n";
			results += "hard_lock"+stats.hard_lock     +"\n";
			results += "rock_att: "+stats.rock_att     +"\n";
			results += "rock_def: "+stats.rock_def     +"\n";
			results += "paper_att: "+stats.paper_att    +"\n";
			results += "paper_def: "+stats.paper_def    +"\n";
			results += "scis_att: "+stats.scissors_att +"\n";
			results += "scis_def: "+stats.scissors_def +"\n";
			results += "life: "+stats.life         +"\n";
			results += "gold_reward: "+stats.gold_reward  +"\n";
			results += "exp_reward: "+stats.exp_reward   +"\n";
			results += "color: "+stats.color        +"\n";
			results += "character: "+stats.character    +"\n";
			
			alert(results);  
		});
	}else{
		alert("invalid input");
	}
}

function testLoadPlayerLevelUpInfo(){
	var level;
	level = prompt("Specify a level to view", "7");
	if(level > 1 && level < 21){
		stats = loadPlayerLevelUpInfo(level,function(info){
			
			var results;
			results = "Player Level Up Info: \n";
			results += "level: "+info.level		  +"\n";
			results += "required exp: "+info.req_exp		  +"\n";
			results += "rock_att_boost: "+info.rock_att_boost     +"\n";
			results += "rock_def_boost: "+info.rock_def_boost     +"\n";
			results += "paper_att_boost: "+info.paper_att_boost    +"\n";
			results += "paper_def_boost: "+info.paper_def_boost    +"\n";
			results += "scis_att_boost: "+info.scissors_att_boost +"\n";
			results += "scis_def_boost: "+info.scissors_def_boost +"\n";
			
			alert(results);  
		});
	}else{
		alert("invalid input");
	}
}

function loadFrom(tableName, CallBackFunction){
	
}

function saveTo(tableName, data){
	
}

function savePlayer(player){
	
	var level;
	var experience;
	var current_computer_level;
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
	var color;
	var character;
	var query;
	
	level         = player.level;
	experience    = player.experience;
	current_computer_level = player.current_computer_level;
	rock_att      = player.rock_att;
	rock_def      = player.rock_def;
	paper_att     = player.paper_att;
	paper_def     = player.paper_def;
	scissors_att  = player.scissors_att;
	scissors_def  = player.scissors_def;
	max_life      = player.max_life;
	current_life  = player.current_life;
	gold          = player.gold;
	gold_storage  = player.gold_storage;
	exp_storage   = player.exp_storage;
	color   	  = player.color;
	character     = player.character;
	
			
	query = "update player   "   +
			"set level=?, 	 "   +
			"experience=?, 	 "   +
			"current_computer_level=?, "  +
			"rock_att=?, 	 "   +
			"rock_def=?, 	 "   +
			"paper_att=?, 	 "   +
			"paper_def=?, 	 "   +
			"scissors_att=?, "   +
			"scissors_def=?, "   +
			"max_life=?,     "   +
			"current_life=?, "   +
			"gold=?,         "   +
			"gold_storage=?, "   +
			"exp_storage=?,	 "   +
			"color=?,        "   +  
			"character=?	 "   +  
			"where id='1'";
	
	db.transaction(function(tx){
		tx.executeSql(query,
			[
				level,
				experience,
				current_computer_level,
				rock_att,
				rock_def,
				paper_att,
				paper_def,
				scissors_att,
				scissors_def,
				max_life,
				current_life,
				gold,
				gold_storage,
				exp_storage,
				color,
				character
			]);	
	},dbErrorHandler, querySuccess);
}

function saveLevelLock(levelLock){
	var query = "update level_lock   	"   +
				"	easy_lock=?,	 	"   +
				"	medium_lock=?,      "   +  
				"	hard_lock=?	 		"   +  
				"where			 		"	+
				"	country=? and 		"   +
				"	level=?	 			";
				
	db.transaction(function(tx){
		tx.executeSql(query,
			[
				levelLock.easy_lock,
				levelLock.medium_lock,
				levelLock.hard_lock,
				levelLock.country,
				levelLock.level
			]);	
	},dbErrorHandler, querySuccess);
	
}

function saveSetting(setting){
	
	//ensure only 1 and 0 are used for value.
	if(setting.value !== 0){
		setting.value=1;		
	}
	
	var query = "update settings   	    "   +
				"	value=?	 			"   +  
				"where			 		"	+
				"	settings=?    		"   +
				
	db.transaction(function(tx){
		tx.executeSql(query,
			[
				setting.value,
				setting.setting
			]);	
	},dbErrorHandler, querySuccess);
}

function saveComputerDefaultStats(stats){
	var level		=stats.level		;
	var medium_lock =stats.medium_lock;
	var hard_lock   =stats.hard_lock;
	var rock_att	=stats.rock_att	;            
	var rock_def	=stats.rock_def	;             
	var paper_att	=stats.paper_att	;           
	var paper_def	=stats.paper_def	;           
	var scissors_att=stats.scissors_att;  
	var scissors_def=stats.scissors_def;         
	var life		=stats.life		;
	var gold_reward =stats.gold_reward;
	var exp_reward  =stats.exp_reward;
	var color  		=stats.color;        
	var character   =stats.character;
	var query;
	
	query = "update comp_def_stats	"+
			"set rock_att=?, "       +
			"	rock_def=?, "       +
			"	paper_att=?, "      +
			"	paper_def=?, "      +
			"	scissors_att=?, "   +
			"	scissors_def=?, "   +
			"	life=?, "   		+
			"	gold_reward=?, "    +
			"	exp_reward=?, "     +
			"	color=?, "   		+
			"	character=?, "   	+
			"   medium_lock=?, "    +
			"   hard_lock=?    "    +
			"where level=?";    
			
	db.transaction(function(tx){
		tx.executeSql(query,
			[
				rock_att,
				rock_def,
				paper_att,
				paper_def,
				scissors_att,
				scissors_def,
				life,
				gold_reward,
				exp_reward,
				color,
				character,
				medium_lock,
				hard_lock,
				level
			]);	
	},dbErrorHandler, querySuccess);
}

function savePlayerLevelUpInfo(info){
	var level				=info.level			;
	var req_exp				=info.req_exp	    ;
	var rock_att_boost		=info.rock_att_boost		;            
	var rock_def_boost		=info.rock_def_boost		;             
	var paper_att_boost		=info.paper_att_boost		;           
	var paper_def_boost		=info.paper_def_boost		;           
	var scissors_att_boost	=info.scissors_att_boost	;  
	var scissors_def_boost	=info.scissors_def_boost	; 
	var query;    
	
	query = "update player_level_up_info	"+
			"set req_exp=?, "				+ 
			"	rock_att_boost	=?, "       +
			"	rock_def_boost	=?, "       +
			"	paper_att_boost	=?, "       +
			"	paper_def_boost	=?, "       +
			"	scissors_att_boost	=?, "   +
			"	scissors_def_boost	=?  "   +
			"where level=?";  
			  
	db.transaction(function(tx){
		tx.executeSql(query,
			[
				req_exp,
				rock_att_boost,
				rock_def_boost,
				paper_att_boost,
				paper_def_boost,
				scissors_att_boost,
				scissors_def_boost,
				level
			]);	
	},dbErrorHandler, querySuccess);
}

function saveComputer(computer){
	
	var level;
	var difficulty;
	var rock_att;
	var rock_def;
	var paper_att;
	var paper_def;
	var scissors_att;
	var scissors_def;
	var max_life;
	var current_life;
	var gold_reward;
	var exp_reward;
	var color;
	var character;
	var query;
	
	level         = computer.level;
	difficulty    = computer.difficulty;
	rock_att      = computer.rock_att;
	rock_def      = computer.rock_def;
	paper_att     = computer.paper_att;
	paper_def     = computer.paper_def;
	scissors_att  = computer.scissors_att;
	scissors_def  = computer.scissors_def;
	max_life      = computer.max_life;
	current_life  = computer.current_life;
	gold_reward   = computer.gold_reward;
	exp_reward    = computer.exp_reward ;
	color         = computer.color      ;
	character     = computer.character  ;
	
	query = "update computer	"+
			"	set level=?, "      +
			"   set difficulty=?, " +
			"	rock_att=?, "       +
			"	rock_def=?, "       +
			"	paper_att=?, "      +
			"	paper_def=?, "      +
			"	scissors_att=?, "   +
			"	scissors_def=?, "   +
			"	max_life=?, "       +
			"	current_life=?, "   +
			"	gold_reward=?, "    +
			"	exp_reward=?, "     +
			"	color=?, "          +
			"	character=? "      +
			"where id='1'";
			
	db.transaction(function(tx){
		tx.executeSql(query,
			[
				level,
				difficulty,
				rock_att,
				rock_def,
				paper_att,
				paper_def,
				scissors_att,
				scissors_def,
				max_life,
				current_life,
				gold_reward,
				exp_reward,
				color,
				character
			]);	
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
				current_computer_level:row.current_computer_level,
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
				exp_storage:row.exp_storage,
				color:row.color,
				character:row.character
			};
			
			
			
		   //callBackFunction to execute when 
		   // we finally have the results from
		   // the sql query
		   callBackFunction(result);		
		}, dbErrorHandler);
	},dbErrorHandler,querySuccess);
}

function loadLevelLock(country, level, callBackFunction){
	db.transaction(function(tx){
		tx.executeSql("Select * from level_lock where country=? and level=?",[country, level],
		function (tx, results){
			var row = results.rows.item(0);
			var result = {
				country:row.country,
				level:row.level,
				easy_lock:row.easy_lock,
				medium_lock:row.medium_lock,
				hard_lock:row.hard_lock
			};
			
			
			
		   //callBackFunction to execute when 
		   // we finally have the results from
		   // the sql query
		   callBackFunction(result);		
		}, dbErrorHandler);
	},dbErrorHandler,querySuccess);
}

function loadSetting(setting, callBackFunction){
	db.transaction(function(tx){
		tx.executeSql("Select * from settings where setting=?",[setting],
		function (tx, results){
			var row = results.rows.item(0);
			var result = {
				setting:row.setting,
				value:row.value
			};
			
			
			
		   //callBackFunction to execute when 
		   // we finally have the results from
		   // the sql query
		   callBackFunction(result);		
		}, dbErrorHandler);
	},dbErrorHandler,querySuccess);
}

function loadPlayerLevelUpInfo(forLevel,callBackFunction){
	db.transaction(function(tx){
		tx.executeSql("Select * from player_level_up_info where level=? ",[forLevel],
			function(tx, results){
				// handle result
				var row = results.rows.item(0);
				var result = {
					level:row.level,
					req_exp:row.req_exp,
					rock_att_boost:row.rock_att_boost,
					rock_def_boost:row.rock_def_boost,
					paper_att_boost:row.paper_att_boost,
					paper_def_boost:row.paper_def_boost,
					scissors_att_boost:row.scissors_att_boost,
					scissors_def_boost:row.scissors_def_boost
				};
			
			//callBackFunction to execute
		    callBackFunction(result);	
			},dbErrorHandler);
	},dbErrorHandler,querySuccess);
}

function loadComputerDefaultStatsTable(forLevel, callBackFunction){
	db.transaction(function(tx){
		tx.executeSql("Select * from comp_def_stats where level=? ",[forLevel],
			function(tx, results){
				// handle result
				var row = results.rows.item(0);
				var result = {
					level:row.level,
					medium_lock:row.medium_lock,
					hard_lock:row.hard_lock,
					rock_att:row.rock_att,
					rock_def:row.rock_def,
					paper_att:row.paper_att,
					paper_def:row.paper_def,
					scissors_att:row.scissors_att,
					scissors_def:row.scissors_def,
					life:row.life,
					gold_reward:row.gold_reward,
					exp_reward:row.exp_reward,
					color:row.color,
					character:row.character
				};
			
			//call back				
		    callBackFunction(result);	
			},dbErrorHandler);
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
				difficulty:row.difficulty,
				rock_att:row.rock_att,
				rock_def:row.rock_def,
				paper_att:row.paper_att,
				paper_def:row.paper_def,
				scissors_att:row.scissors_att,
				scissors_def:row.scissors_def,
				max_life:row.max_life,
				current_life:row.current_life,
				gold_reward:row.gold_reward,
				exp_reward:row.exp_reward,
				color:row.color,
				character:row.character
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
	tx.executeSql(initPlayerLevelUpInfoTable());
	tx.executeSql(initLevelLockTable());
	tx.executeSql(initSettingsTable());
	
	//init default data
	// if this is the first time the app has run.
	// i.e. player, computer, etc. 
	initData(tx);
}

function initTablesHard(tx){
	//init tables
	tx.executeSql("drop table if exists player");
	tx.executeSql("drop table if exists computer");
	tx.executeSql("drop table if exists exp_per_level");
	tx.executeSql("drop table if exists comp_def_stats");
	tx.executeSql("drop table if exists player_level_up_info");
	tx.executeSql("drop table if exists level_lock");
	tx.executeSql("drop table if exists settings");
	
	tx.executeSql(initPlayerTable());
	tx.executeSql(initComputerTable());
	tx.executeSql(initComputerDefaultStatsTable());
	tx.executeSql(initPlayerLevelUpInfoTable());
	tx.executeSql(initLevelLockTable());
	tx.executeSql(initSettingsTable());
// 	
	// //init default data
	// // if this is the first time the app has run.
	// // i.e. player, computer, etc. 
	initData(tx);
}
 
 

function dbErrorHandler(e){
	alert("error code: " + e.code + "\n message: " + e.message);
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
	var difficulty = "easy";
	var experience = 0;
	var current_computer_level = 1;
	var rock_att	= 1;
	var rock_def	= 1;
	var paper_att   = 1;
	var paper_def   = 1;
	var scissors_att = 1;
	var scissors_def = 1;
	var max_life    = 10;
	var current_life= 10;
	var gold = 101;
	var gold_storage=1000;
	var exp_storage=1000;
	var color="bronze";
	var character="knight";
	var gold_reward=200;
	var exp_reward=100;
	
	
	// or ignore -> if data is already initialized in the table then do nothing.
	tx.executeSql("insert or ignore into player "+
				   "( "	+
					"   id, "            +
					"  	level, "         +
					"  	experience, "    +
					"  current_computer_level, " +
					"  	rock_att, "      +
					"  	rock_def, "      +
					" 	paper_att, "     +
					" 	paper_def, "     +
					" 	scissors_att, "  +
					" 	scissors_def, "  +
					"  	max_life, "      +
					"   current_life, "  +
					"   gold, "          +
					"   gold_storage, "  +
					"   exp_storage, "   +
					" 	color, "  +
					" 	character "  +
				   ") "+
				   "values(1,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",
				   [
					   level,
					   experience,
					   current_computer_level,
					   rock_att,
					   rock_def,
					   paper_att,
					   paper_def,
					   scissors_def,
					   scissors_def,
					   max_life,
					   current_life,
					   gold,
					   gold_storage,
					   exp_storage,
					   color,
					   character
				   ]
				  );
			
    tx.executeSql("insert or ignore into computer "+
				   "("                  +
					" 	id, "+
					"	level, "    +
					"   difficulty, "    +
					" 	rock_att, "     +
					" 	rock_def, "     +
					" 	paper_att, "    +
					"  	paper_def, "    +
					" 	scissors_att, " +
					" 	scissors_def, " +
					" 	max_life, "     +
					" 	current_life, "  +
					" 	gold_reward, "  +
					" 	exp_reward, "  +
					" 	color, "  +
					" 	character "  +
				   ") "+
				   "values(1,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",
				   [
					   level,
					   difficulty,
					   rock_att,
					   rock_def,
					   paper_att,
					   paper_def,
					   scissors_def,
					   scissors_def,
					   max_life,
					   current_life,
					   gold_reward,
					   exp_reward,
					   color,
					   character
				  ]
				 );
				 
	initComputerDefaultStatsData(tx);
	initPlayerLevelUpInfoData(tx);	
	initLevelLockData(tx);	
	initSettingData(tx);	 
}
var level;
    var rock_att;
    var rock_def;
    var paper_att;
    var paper_def;
    var scissors_def;
    var scissors_def;
    var life;
    var gold_reward;
    var exp_reward;
    var color="bronze";
    var character="knight";
	
	for(i=1; i<= 20; i++){
		level        = i;
		rock_att     = i;
		rock_def     = i;
		paper_att    = i;
		paper_def    = i;
		scissors_def = i;
		scissors_def = i;
		life     = i * 10;
		gold_reward  = i * 200;
		exp_reward   = i * 100;
		
		tx.executeSql("insert or ignore into comp_def_stats "+
					   "(	"               +
					    "   level, "	    +
						" 	rock_att, "     +
						" 	rock_def, "     +
						" 	paper_att, "    +
						"  	paper_def, "    +
						" 	scissors_att, " +
						" 	scissors_def, " +
						" 	life, "     +
						" 	gold_reward, "  +
						" 	exp_reward, "  +
						" 	color, "  +
						" 	character "  +
					   ") "+
					   "values(?,?,?,?,?,?,?,?,?,?,?,?) ",
					   [
						   level,
						   rock_att,
						   rock_def,
						   paper_att,
						   paper_def,
						   scissors_def,
						   scissors_def,
						   life,
						   gold_reward,
						   exp_reward,
						   color,
						   character
					  ]
				 );
	}
function initLevelLockData(tx){
	var countries = ["Greece","China","Japan"];
	var country = "";
	for(countryIndex=0; countryIndex<3; countryIndex++){
		country=countries[countryIndex];
		for(level=1; level <=21; level++){
			tx.executeSql("insert or ignore into level_lock "+
					   "(									"               +
					    "   country, 						"	    +
						" 	level 							"     +
					   ") 									" +
					   "values(?,?) 						",
					   [
						   country,
						   level
					  ]
				 );
		}
	}
	
}

// music (yes, no), sound effects(yes, no), vibrate (on, off)
function initSettingData(tx){
	tx.executeSql("insert or ignore into settings (setting,value) values (?,?)",["Music",1]);
	tx.executeSql("insert or ignore into settings (setting,value) values (?,?)",["SoundEffect",1]);
	tx.executeSql("insert or ignore into settings (setting,value) values (?,?)",["Vibration",1]);
}

function initPlayerLevelUpInfoTable(){
	var result;
	result = "create table if not exists player_level_up_info " +
			 "( " +
			 "	level INTEGER PRIMARY KEY AUTOINCREMENT, " +
			 "	req_exp INTEGER,	 					 " +
			 "	rock_att_boost INTEGER,				     " +
			 "	rock_def_boost INTEGER,				     " +
			 "	paper_att_boost INTEGER,			     " +
			 "	paper_def_boost INTEGER,			     " +
			 "	scissor_att_boost INTEGER,			     " +
			 "	scissor_def_boost INTEGER			     " +
			 ")";
			 
    return result;
}

function initPlayerLevelUpInfoData(tx){
	var level;
	var req_exp;
    var rock_att_boost;
    var rock_def_boost;
    var paper_att_boost;
    var paper_def_boost;
    var scissors_def_boost;
    var scissors_def_boost;
    
    for (i=2; i<= 20; i++){
    	level              = i;
		req_exp            = i*100;
		rock_att_boost     = i;
		rock_def_boost     = i;
		paper_att_boost    = i;
		paper_def_boost    = i;
		scissors_def_boost = i;
		scissors_def_boost = i;	
		
		tx.executeSql("insert or ignore into player_level_up_info "+
					   "(	"               		+
					    "   level, "	    		+
					    "   req_exp, "	    		+
						" 	rock_att_boost, "     	+
						" 	rock_def_boost, "     	+
						" 	paper_att_boost, "    	+
						"  	paper_def_boost, "    	+
						" 	scissors_att_boost, " 	+
						" 	scissors_def_boost " 	+
					   ") "+						
					   "values(?,?,?,?,?,?,?,?) ",
					   [
						   level,
						   req_exp,
						   rock_att_boost,
						   rock_def_boost,
						   paper_att_boost,
						   paper_def_boost,
						   scissors_def_boost,
						   scissors_def_boost
					  ]
				 );
    }
}

function initComputerDefaultStatsData(tx){
    
    
    //every 8 computer levels has a different color
	//every 24 computer levels has a different character (knight, soldier, samuri?)
    var level;
    var medium_lock;
    var hard_lock;
    var rock_att;
    var rock_def;
    var paper_att;
    var paper_def;
    var scissors_def;
    var scissors_def;
    var life;
    var gold_reward;
    var exp_reward;
    var color;
    var character;
	var colorIndex=0;
	var characterIndex=0;
	var colors = ["bronze","silver","gold"];
	var characters = ["knight","soldier","samurai"];
	
	for(i=1; i<= 96; i++){
		level        = i;
		medium_lock  = 1;
		hard_lock    = 1;
		rock_att     = i;
		rock_def     = i;
		paper_att    = i;
		paper_def    = i;
		scissors_def = i;
		scissors_def = i;
		life     = i * 10;
		gold_reward  = i * 200;
		exp_reward   = i * 100;
		
		if(i%9==0){
			colorIndex=colorIndex+1;
			if(colorIndex>2){
				colorIndex=0;
			}
		}
		if(i%25==0){
			characterIndex=characterIndex+1;
			if(characterIndex>2){
				characterIndex=0;
			}
		}
		
		color=colors[colorIndex];
		character=characters[characterIndex];
		
		tx.executeSql("insert or ignore into comp_def_stats "+
					   "(	"               +
					    "   level, "	    +
					    "   medium_lock, "  +
					    "   hard_lock,  "   +
						" 	rock_att, "     +
						" 	rock_def, "     +
						" 	paper_att, "    +
						"  	paper_def, "    +
						" 	scissors_att, " +
						" 	scissors_def, " +
						" 	life, "     +
						" 	gold_reward, "  +
						" 	exp_reward, "  +
						" 	color, "  +
						" 	character "  +
					   ") "+
					   "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",
					   [
						   level,
						   medium_lock,
						   hard_lock,
						   rock_att,
						   rock_def,
						   paper_att,
						   paper_def,
						   scissors_def,
						   scissors_def,
						   life,
						   gold_reward,
						   exp_reward,
						   color,
						   character
					  ]
				 );
	}
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

// this table determines how much experience is required for the player to level up
// and what stat boosts the player gets when leveling up.
function initPlayerLevelUpInfoTable(){
	var result;
	result = "create table if not exists player_level_up_info " +
			 "( " +
			 "	level INTEGER PRIMARY KEY AUTOINCREMENT, " +
			 "	req_exp INTEGER,	 					 " +
			 "	rock_att_boost INTEGER,				     " +
			 "	rock_def_boost INTEGER,				     " +
			 "	paper_att_boost INTEGER,			     " +
			 "	paper_def_boost INTEGER,			     " +
			 "	scissors_att_boost INTEGER,			     " +
			 "	scissors_def_boost INTEGER			     " +
			 ")";
			 
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
			"	medium_lock INTEGER DEFAULT 1, 				" +
			"	hard_lock INTEGER DEFAULT 1,				" +
			"	rock_att INTEGER, 		" +
			"	rock_def INTEGER, 		" +
			"	paper_att INTEGER, 		" +
			"	paper_def INTEGER, 		" +
			"	scissors_att INTEGER, 	" +
			"	scissors_def INTEGER, 	" +
			"	life INTEGER,			" +
			"	gold_reward INTEGER,  	" +
			"	exp_reward INTEGER,  	" +
			"	color TEXT,  	        " +
			"	character TEXT  	    " +
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
			"   difficulty TEXT,        " +
			"	rock_att INTEGER, 		" +
			"	rock_def INTEGER, 		" +
			"	paper_att INTEGER, 		" +
			"	paper_def INTEGER, 		" +
			"	scissors_att INTEGER, 	" +
			"	scissors_def INTEGER, 	" +
			"	max_life INTEGER,		" +
			"	current_life INTEGER,  	" +
			"	gold_reward INTEGER,  	" +
			"	exp_reward INTEGER,  	" +
			"	color TEXT,  	        " +
			"	character TEXT  	    " +
			") ";
	
	return result;
}


//computer - gold to give to player
//computer - exp to give to player
//computer  - color
///computer - character

//returns query to initialize the player table
function initPlayerTable(){
	var result;
	result = "create table if not exists player " +
			"( " +
			"	id INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"	level INTEGER, 			" +
			"	experience INTEGER, 	" +
			"   current_computer_level INTEGER, " +
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
			"   exp_storage INTEGER,    " + 
			"	color TEXT,  	        " +
			"	character TEXT  	    " +
			") ";
	
	return result;
}

function initLevelLockTable(){
	var result;
	result = "create table if not exists level_lock 		" +
			"( 												" +
			"   country TEXT, 								" +
			"   level INTEGER, 								" +
			"	easy_lock INTEGER DEFAULT 1, 				" +
			"	medium_lock INTEGER DEFAULT 1, 				" +
			"	hard_lock INTEGER DEFAULT 1,				" +
			"	PRIMARY KEY(country , level ) 					" +
			") ";
	
	return result;
}

//setting - name of setting
//value - 1 for on, 0 for off.
function initSettingsTable(){
	var result;
	result = "create table if not exists settings " + 
	"( " +
	"	setting TEXT PRIMARY KEY, "+
	"	value INTEGER DEFAULT 1 "+
	")";
	
	return result;
}

//todo:
//sound effects (record or find opensource)

