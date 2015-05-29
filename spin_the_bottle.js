var Players = require('./players.js');
var Animate = require('./customAnimations.js');

// Spin the bottle game module
module.exports = {
    running: false,
    initialize: function () {

        // Start the game
        Homey.log('Ready for that spin?');

        // Set state running
        this.running = true;
    },
    spinTheBottle: function () {

        // Get random player
        var randomPlayer = Math.floor((Math.random() * Players.names.length));

        // Announce winner, or loser ghehe
        Homey.log(Players.names[randomPlayer] + " you lucky bastard!");
        Homey.manager('speech-output').say(Players.names[randomPlayer] + " you lucky bastard!");

        // Animate winning player
        Animate.playerSegment(randomPlayer, Players.numberOfPlayers);
    }
};