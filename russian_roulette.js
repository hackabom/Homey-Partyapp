var Players = require('./players.js');
var Animate = require('./customAnimations.js');

module.exports = {
    title: 'Russian Roulette',
    chamber: [1,2,3,4,5,6,7,8],
    bullet: 4,
    running: false,
    initialize: function () {
        Homey.log("Let's start Russian roulette, " + Players.getCurrentPlayer() + " are you ready?");
        this.running = true;
        // Reset chamber
        this.chamber = [1,2,3,4,5,6,7,8];
        this.bullet = Math.floor((Math.random() * this.chamber.length) + 1);

    },
    nextMove: function() {
        var result = Math.floor((Math.random() * this.chamber.length));

        // Check for bullet in chamber
        if(this.chamber[result] == this.bullet){
            Animate.bang();
            Animate.stop();

            Homey.log("POOF! " + Players.getCurrentPlayer() + " you're dead..");
            Homey.log("Game over..");
            return;
        } else {
            Homey.log('Oef, just safe');
        }
        this.chamber.splice(result, 1);

        // Move to next player
        Players.setNextPlayer();

        Homey.log("Only " + this.chamber.length + " bullets left, " + Players.getCurrentPlayer() + " are you ready for the next move?");
    }
};