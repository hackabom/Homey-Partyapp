"use strict";
var inGame = false;
var playersInitiated = false;
var playersAdded = 0;
var numberOfPlayers = 0;
var players = [];

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

var initiatePlayer = function ( playerNumber ) {
	Homey.log("What is the name of player " + (playersAdded + 1) + "?");
};


var initiatePlayers = function () {

	if(playersAdded < numberOfPlayers) {
		initiatePlayer(playersAdded + 1);
	} else {
		Homey.log("All setup, let's play!");
		Homey.log(players);
		playersInitiated = true;
	}
};

var continuePlayerInitiation = function () {

}
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
		else if( inGame && (!playersInitiated && (trigger.id == '1' || trigger.id == '2' || trigger.id == '3' || trigger.id == '4' || trigger.id == '5'))) {
			// Respond
			(trigger.id == '1')? Homey.log('Ok, lets setup for 1 player'): Homey.log('Ok, lets setup for ' + trigger. id +' players');
			
			// Init players
			Homey.log(trigger.id);
			numberOfPlayers = parseInt(trigger.id);
			initiatePlayers();
		} 
		else if ( trigger.id == 'robin' ) {
			Homey.log('Added Robin');

			if(!playersInitiated) {
				players[playersAdded] = trigger.id;
				playersAdded++;
				initiatePlayers();
			}

		}
		else if ( trigger.id == 'floris' ) {
			Homey.log('Added Floris');

			if(!playersInitiated) {
				players[playersAdded] = trigger.id;
				playersAdded++;
				initiatePlayers();
			}
			playersAdded++;

		}
		// Quit game mode
		else if ( trigger.id == 'quit') {
			Homey.log('Thanks for playing, it was fun!');
			
			// End game mode
			inGame = false;
		}
        
    });
        
}