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
	initPlayer: function (playerName) {

		// Add player
		this.names.push(playerName);
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