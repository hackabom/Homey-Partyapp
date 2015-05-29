var Players = require('./players.js');
var Animate = require('./customAnimations.js');

// Russian game roulette module
module.exports = {
    chamber: [1,2,3,4,5,6,7,8],
    bullet: null,
    running: false,
    initialize: function () {

        // Start game
        Homey.log("Let's start Russian roulette, " + Players.getCurrentPlayer() + " are you ready?");
        this.running = true;

        // Reset chamber
        this.chamber = [1,2,3,4,5,6,7,8];
        this.bullet = Math.floor((Math.random() * this.chamber.length) + 1);
    },
    nextMove: function() {
        // Get random chamber
        var result = Math.floor((Math.random() * this.chamber.length));

        // Check for bullet in chamber
        if(this.chamber[result] == this.bullet){

            // Initiate red flash animation
            Animate.bang();

            // Stop the animation
            setTimeout(function(){Animate.stop();}, 500);

            // Announce imminent death
            Homey.log("PAF! " + Players.getCurrentPlayer() + " you're dead..");
            Homey.log("Game over..");
            return;
        } else {
            // Announce escape
            Homey.log('Oef, just safe');
        }

        // Remove bullet from chamber
        this.chamber.splice(result, 1);

        // Move to next player
        Players.setNextPlayer();

        // Announce bullets left for next target
        Homey.log("Only " + this.chamber.length + " bullets left, " + Players.getCurrentPlayer() + " are you ready for the next move?");
    }
};