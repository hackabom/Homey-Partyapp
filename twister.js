var Animate = require('./customAnimations.js');

module.exports = {
    title: "Twister",
    limb: ["right foot", "left foot", "right hand", "left hand"],
    color: ["red","green","yellow","blue"],
    running: false,
    initialize: function() {
        Homey.log("Let’s get those feet going, whooooo!!! Are you ready?");
        this.running = true;
    },
    nextMove: function () {

        var curColor = this.color[Math.floor(Math.random() * 4)];
        Homey.log('Everyone! Put your ' + this.limb[Math.floor(Math.random() * 4)] + ' on ' + curColor + '!');

        Animate.rotateColor(curColor);

        Homey.log("Ready for the next move?");
    }
};