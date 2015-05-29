"use strict";
var inGame = false;
var setupDone = false;
var numberOfPlayers = 0;

function App() 
{

}

module.exports = App;

App.prototype.init = function(){
	
	Homey.manager('ledring').animate({
		name: 'pulse'
	});
  
};

// Players object
var Players = {
	total: 0,
	names: [],
	addPlayer: function (playerName) {

		// Add player
		this.names.push(playerName);
		this.total++;

		// Remaining players to add
		if (this.total < numberOfPlayers) {
			Players.askForNewPlayer();
		}
		// Setup done
		else {
			Homey.log("All setup, let's play!");
			Homey.log(this.names);
			setupDone = true;
			RussianRoulette.intialize();
		}
	},
	askForNewPlayer: function () {
		Homey.log("What is the name of player " + (this.total + 1) + "?");
	}
};

var RussianRoulette = {
	title: 'Russian Roulette',
	chamber: [1,2,3,4,5,6,7,8],
	bullet: 4,
	intialize: function () {
		Homey.log("Let's start Russian roulette, are you ready?");
	},
	move: function() {
		Homey.log(Players.names[0] + " be prepared...");
		var result = Math.floor((Math.random() * this.chamber.length));
		Homey.log(this.chamber);
		Homey.log(this.chamber[result]);

		if(this.chamber[result] == this.bullet){
			Homey.log("YOU ARE DEAD");
		} else {
			Homey.log('Oef, just safe');
		}
		this.chamber.splice(result, 1);

		Homey.log("Ready for the next move?");
	}

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
			numberOfPlayers = parseInt(trigger.id);
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
			RussianRoulette.move();
		}
		// Quit game mode
		else if ( trigger.id == 'quit') {
			Homey.log('Thanks for playing, it was fun!');
			
			// End game mode
			inGame = false;
		}
        
    });
        
}