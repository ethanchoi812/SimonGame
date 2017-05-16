//onclick start or reset
	// begin game
window.onload = function(){
	game();
}
	//var start = document.getElementById("start");
	//start.onclick(function(){
	//	game();
	//});


/*
var greenOne = document.getElementById("green");
var redOne = document.getElementById("red");
var yellowOne = document.getElementById("yellow");
var blueOne = document.getElementById("blue");
*/

var playerLog = [];
var comLog = [];

function game(){

	var colorElmts = ["green", "red", "yellow", "blue"];
	var count = 0;

	for (var n=0; n<20; n++){

		var isSame = (comLog.length === playerLog.length) &&
		playerLog.every(function(el, idx){
			el === comLog[idx];
		});
					
			for(var i=0; i<colorElmts.length; i++){

				var num = Math.floor(Math.random()*4);
				comLog.push(colorElmts[num]);
				console.log(comLog);
				setTimeout(playEffect(colorElmts[num]),1000);
			
				getPlayerInput(colorElmts[i]);	
			}				
		
	}
}

function playEffect(color){

	var el = document.getElementById(color);
	el.classList.add(color + "-new");
	document.getElementById(color + "-sound").play();
	
	setTimeout(function(){
		el.classList.remove(color + "-new");
	}, 500);
}

function getPlayerInput(color){

	var el = document.getElementById(color);
 	el.addEventListener("click", function(){
		
		playerLog.push(color);
		playEffect(color);
		
	});
 }



