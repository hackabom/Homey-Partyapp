"use strict";
var game = null;
var inGame = false;
var setupDone = false;
var RussianRoulette = require('./russian_roulette.js');
var Twister = require('./twister.js');
var Players = require('./players.js');
Players.numberOfPlayers = 0;

function App() 
{

}

module.exports = App;

App.prototype.init = function(){
	Homey.manager('ledring').animate({
		name: 'pulse'
	});
  
};

App.prototype.speech = function( speech ) {
	
	// loop all triggers
    speech.triggers.forEach(function(trigger){
		Homey.log(trigger);
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
			Players.numberOfPlayers = parseInt(trigger.id);
			Players.askForNewPlayer();
		} 
		else if ( trigger.id == 'robin' ) {
			Homey.log('Added Robin');
			Players.addPlayer(trigger.id);
		}
		else if ( trigger.id == 'floris' ) {
			Homey.log('Added Floris');
			Players.addPlayer(trigger.id);
		}
		else if ( trigger.id == 'emile' ) {
			Homey.log('Added Emile');
			Players.addPlayer(trigger.id);
		}
		// Russian Roulette
		else if (trigger.id == 'yes') {
			if(Twister.running){
				Twister.nextMove();

			} else if (RussianRoulette.running) {
				RussianRoulette.nextMove();
			}
		}
		else if (trigger.id == 'roulette') {
			RussianRoulette.initialize();
		}
		else if (trigger.id == 'twister') {
			Twister.initialize();
		}
		// Quit game mode
		else if ( trigger.id == 'quit') {
			Homey.log('Thanks for playing, it was fun!');
			
			// End game mode
			inGame = false;
		}
    });
}