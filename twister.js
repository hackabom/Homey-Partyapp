// Include animations
var Animate = require('./customAnimations.js');

// Twister game module
module.exports = {
    title: "Twister",
    action: ["right foot", "left foot", "right hand", "left hand"],
    color: ["red","green","yellow","blue"],
    running: false,
    initialize: function() {
        Homey.log("Let’s get those feet going, whooooo!!! Are you ready?");
        this.running = true;
    },
    nextMove: function () {

        // Get random color
        var rndColor = this.color[Math.floor(Math.random() * 4)];

        // Announce new move
        Homey.log('Everyone! Put your ' + this.action[Math.floor(Math.random() * 4)] + ' on ' + rndColor + '!');

        // Perform nice animation
        Animate.rotateColor(rndColor);

        // Ask if ready for next move
        Homey.log("Ready for the next move?");
    }
};