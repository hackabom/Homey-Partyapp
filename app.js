"use strict";
// Keeping track if game is started
var inGame = false;

// Include russian roulette game
var RussianRoulette = require('./russian_roulette.js');

// Include twister game
var Twister = require('./twister.js');

// Include players
var Players = require('./players.js');

// Include spin the bottle
var Bottle = require('./spin_the_bottle.js');

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

		// Start a game
        if( trigger.id == 'game' ) {
			// Game mode on
			inGame = true;

           	Homey.log('Ok, great. How many players?');
			Homey.manager('speech-output').say( 'Ok, great. How many players?');

		}
		// Get the number of players
		else if( inGame && (trigger.id == '1' || trigger.id == '2' || trigger.id == '3' || trigger.id == '4' || trigger.id == '5')) {
			// Respond
			(trigger.id == '1')? Homey.log('Ok, lets setup for 1 player'): Homey.log('Ok, lets setup for ' + trigger. id +' players');
			(trigger.id == '1')? Homey.manager('speech-output').say('Ok, lets setup for 1 player'): Homey.manager('speech-output').say('Ok, lets setup for ' + trigger. id +' players');

			// Init players
			Players.numberOfPlayers = parseInt(trigger.id);
			Players.askForNewPlayer();
		}
		// Select players, necessary as homey cant listing to an answer directly yet
		else if ( trigger.id == 'robin' ) {
			Homey.log('Added Robin');
			Homey.manager('speech-output').say('Added Robin');

			// Add player to the game
			Players.addPlayer(trigger.id);
		}
		else if ( trigger.id == 'floris' ) {
			Homey.log('Added Floris');
			Homey.manager('speech-output').say('Added Robin');

			// Add player to the game
			Players.addPlayer(trigger.id);
		}
		else if ( trigger.id == 'emile' ) {
			Homey.log('Added Emile');
			Homey.manager('speech-output').say('Added Robin');

			// Add player to the game
			Players.addPlayer(trigger.id);
		}
		// Yes response within multiple games
		else if (trigger.id == 'yes') {
			if(Twister.running){
				Twister.nextMove();
			} else if (RussianRoulette.running) {
				RussianRoulette.nextMove();
			} else if (Bottle.running) {
				Bottle.spinTheBottle();
			}
		}
		// Select games
		else if (trigger.id == 'roulette') {
			RussianRoulette.initialize();
		}
		else if (trigger.id == 'twister') {
			Twister.initialize();
		}
		else if (trigger.id == 'bottle') {
			Bottle.initialize();
		}
		// Re-spin the bottle
		else if (trigger.id == 'spin again') {
			Bottle.spinTheBottle();
		}
		// Quit game mode
		else if ( trigger.id == 'quit') {
			Homey.log('Thanks for playing, it was fun!');
			Homey.manager('speech-output').say('Thanks for playing, it was fun!');

			// End game mode
			inGame = false;
		}
    });
}