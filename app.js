"use strict";
var inGame = false;
var setupDone = false;
var numberOfPlayers = 0;

function App() 
{

}

module.exports = App;

App.prototype.init = function(){

  	setInterval(function(){
	}, 1000);
	
	Homey.manager('ledring').animate({
		name: 'pulse'
	});
  
};

var Players = {
	total: 0,
	names: [],
	id: [],
	initPlayer: function (playerName) {

		// Add player
		this.names.push(playerName);
		this.names.push(total);
		this.total++;

		// Remaining players to add
		if (this.total < numberOfPlayers) {
			askForPlayer();
		}
		// Setup done
		else {
			Homey.log("All setup, let's play!");
			Homey.log(this.names);
			setupDone = true;
		}
	}
};

var animate = function(){
	var colors = ['blue','red','green','yellow','orange','purple'];
	var ledsPP = Math.round(30/Players.total);
	var animation = [];
	for( var f = 0; f < 30; f++ ) {
		var frame = {
			duration: 6,
			pixels: []
		};

		for( var i = 0; i < 30; i++ ) {			
			var color = Homey.color(colors[Player.id]).saturation(0.1);
			// one player segment
			for( var j = 0; j < ledsPP; j++ ) {
				if(i==(f+j)%30){
					color = color.saturation(1);
				}
			}

			frame.pixels.push([
				Math.round(255 * color.red()),
				Math.round(255 * color.green()),
				Math.round(255 * color.blue())
			]);
		}

		animation.push( frame );
	}
	Homey.manager('ledring').animate(animation);
}


var askForPlayer = function ( ) {
	Homey.log("What is the name of player " + (Players.total + 1) + "?");
};




App.prototype.speech = function( speech ) {
	
	// loop all triggers
    speech.triggers.forEach(function(trigger){
		// Start a game
        if( trigger.id == 'game' ) {
			// Game mode on
			inGame = true;
			
           	Homey.log('Ok, great. How many players?');
		}
		// Get the number of players
		else if( inGame && (!setupDone && (trigger.id == '1' || trigger.id == '2' || trigger.id == '3' || trigger.id == '4' || trigger.id == '5'))) {
			// Respond
			(trigger.id == '1')? Homey.log('Ok, lets setup for 1 player'): Homey.log('Ok, lets setup for ' + trigger. id +' players');
			
			// Init players
			numberOfPlayers = parseInt(trigger.id);
			askForPlayer();
		} 
		else if ( trigger.id == 'robin' ) {
			Homey.log('Added Robin');
			Players.initPlayer(trigger.id);
		}
		else if ( trigger.id == 'floris' ) {
			Homey.log('Added Floris');
			Players.initPlayer(trigger.id);
		}
		else if ( trigger.id == 'emile' ) {
			Homey.log('Added Emile');
			Players.initPlayer(trigger.id);
		}
		// Quit game mode
		else if ( trigger.id == 'quit') {
			Homey.log('Thanks for playing, it was fun!');
			
			// End game mode
			inGame = false;
		}
        
    });
        
}