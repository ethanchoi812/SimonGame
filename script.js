window.onload = function(){

	var startBtn = document.getElementById("start");
	
	startBtn.addEventListener("click", function(){
		Controller.initWith(Model);
	});

}

var Model = {

	players: [
		{
			name: "com",
			sequence: []
		},
		{
			name: "human",
			sequence: []
		}
	],

	colorsElmt: ["green", "red", "blue", "yellow"],
	
	seq_count: 1,
	
	playEffect: function(color){

		var el = document.getElementById(color);

		el.classList.add(color + "-new");
		document.getElementById(color + "-sound").play();

		setTimeout(function(){
			el.classList.remove(color + "-new");
		}, 500);
	},

	generateSeq: function(){

		var n = Math.floor(Math.random()*3);
		Model.players[0].sequence.push(Model.colorsElmt[n]);
		Model.playSeq();
	},

	playSeq: function(){

		for(var i=0; i<Model.players[0].sequence.length; i++){
			
			setTimeout(Model.playEffect(Model.players[0].sequence[i]),
				1000);
		}
	},

	
	init: function(){

		Model.players[0].sequence = [];
		Model.players[1].sequence = [];
		seq_count = 1;
		Model.generateSeq();
	},

	isMatch: false,

	isSame: function(){
			
		arr1 = Model.players[0].sequence;
		arr2 = Model.players[1].sequence;

		if(arr2.length !== arr1.length){
			return false;
		}

		for(var i=0; i<arr2.length; i++){
			if(arr2[i] !== arr1[i]){
				return false;
			}
		}

		return true;
	},

	nextTurn: function(){

		var a = Model.isSame();
		Model.players[1].sequence = [];

		if(!a){

			setTimeout(Model.playSeq(), 2000);			

		} else {

			Model.seq_count += 1;
			Model.generateSeq();
		}
	},

	hasWon: false,

	isWinner: function(){
		if(Model.seq_count > 20){
			console.log("You win!");
			return Model.hasWon === true;
		} 
	}
	
};

var Controller = {

	getView: function(){
		var colorBtns = document.getElementsByClassName("colorBtn");

		for(var i=0; i<colorBtns.length; i++){
			colorBtns[i].addEventListener("click", Controller.action);
		}

		var counter = document.getElementById("counter");
		counter.innerHTML = Controller.model.seq_count;
	},

	initWith: function(game){
		game.init();
		Controller.model = game;
		Controller.view = Controller.getView();
	},

	action: function(evt){

		var game = Controller.model;

		while(game.players[1].sequence.length < game.seq_count) {
			
			var el = evt.target;
			

			game.playEffect(el.id);

			game.players[1].sequence.push(el.id);
		}	
			
		game.isWinner();

		if(!game.hasWon){

			game.nextTurn();
			
		} else {
			
			Controller.end_game();
		
		} 	
	},

	end_game: function(){
		var colorBtns = document.getElementsByClassName("colorBtn");

		for(var i=0; i<colorBtns.length; i++){
			colorBtns[i].removeEventListener("click", Controller.action);
		}
	}

}



