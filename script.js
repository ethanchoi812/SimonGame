window.onload = function(){

	var startBtn = document.getElementById("start");
	var strictBtn = document.getElementById("strict");

	startBtn.addEventListener("click", function(){
		
		startBtn.classList.add("clickedBtn");
		strictBtn.classList.remove("clickedBtn");

		Model.strictMode = false;
		
		setTimeout(function(){
			Controller.initWith(Model);
		}, 500);
	});

	strict.addEventListener("click", function(){

		strictBtn.classList.add("clickedBtn");
		startBtn.classList.remove("clickedBtn");

		Model.strictMode = true;

		setTimeout(function(){
			Controller.initWith(Model);
		}, 500);
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
	
	count: 1,

	strictMode: false,

	setCounter: function(){
		
		var counter = document.getElementById("counter");
		counter.innerHTML = Model.count;
	},

	setMsg: function(msg){
		
		document.getElementById("msg").innerHTML = msg;
		
		setTimeout(function(){
			document.getElementById("msg").innerHTML = "";
		},1500);
	},
	
	playEffect: function(color,n){

		setTimeout(function(){

			var el = document.getElementById(color);

			el.classList.add(color + "-new");
			document.getElementById(color + "-sound").play();
			
			setTimeout(function(){
				el.classList.remove(color + "-new");
			}, 500);

		}, 1000*n);
	},

	generateSeq: function(){

		var n = Math.floor(Math.random()*4);
		Model.players[0].sequence.push(Model.colorsElmt[n]);
		console.log(Model.players[0].sequence);
		Model.playSeq();
	},

	playSeq: function(){
		
		
		var l = Model.players[0].sequence.length;
		
		for(var k=0; k<l; k++){
			
			Model.playEffect(Model.players[0].sequence[k], k);
		}

		setTimeout(function(){
			
			Controller.getBtn();

		}, 1000*l);
	},
	
	init: function(){

		Model.players[0].sequence = [];
		Model.players[1].sequence = [];
		Model.count = 1;
		Model.setCounter();
		Model.generateSeq();
	},

	isSame: function(){
		
		Controller.disableBtn();
		arr1 = Model.players[0].sequence;
		arr2 = Model.players[1].sequence;

		for(var i=0; i<arr2.length; i++){
			
			if(arr2[i] !== arr1[i]){

				if(Model.strictMode){

					Model.setMsg("WRONG. RESTARTING..");
					
					setTimeout(function(){

						Model.init();
					
					}, 1500)
				
				} else {

					Model.setMsg("WRONG");
					
					Model.players[1].sequence = [];
			
					setTimeout(function(){
				
						Model.playSeq();
				
					}, 1500);
				}

				return false;	
			}
		}

		return true; 		 
	},

	nextTurn: function(){

		Model.count += 1;
		
		setTimeout(function(){
		
			Model.setCounter();
		
		},1000);

		setTimeout(function(){
			
			Model.generateSeq();
			Model.players[1].sequence = [];

		}, 1500);

	},

	isWinner: function(){

		if(Model.count === 10){

			Model.setMsg("YOU'VE WON! RESTARTING..");
			Model.init();
		
		} else {
					
			Model.nextTurn();
		} 
	}	
};

var Controller = {

	getBtn: function(){
		var colorBtns = document.getElementsByClassName("colorBtn");

		for(var i=0; i<colorBtns.length; i++){
			colorBtns[i].addEventListener("click", Controller.action);
		}
	},

	initWith: function(game){
		game.init();
		Controller.model = game;
		Controller.view = Controller.getBtn();
	},

	action: function(evt){

		var game = Controller.model;			
		var el = evt.target;

		game.players[1].sequence.push(el.id);

		game.playEffect(el.id, 0);		

		var same = game.isSame();

		if(same === true && Model.players[0].sequence.length === Model.players[1].sequence.length){
					
			Model.isWinner();	
		
		} else {

			Controller.action();
		}	
	},

	disableBtn: function(){
		var colorBtns = document.getElementsByClassName("colorBtn");

		for(var i=0; i<colorBtns.length; i++){
			colorBtns[i].removeEventListener("click", Controller.action);
		}
	}

}



