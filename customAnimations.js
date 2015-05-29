var one = require('onecolor');

module.exports = {
    playerSegment: function(){
        var colors = ['blue','red','green','yellow','orange','purple'];
        var ledsPP = Math.round(30/Players.total);
        var animation = [];
        for( var f = 0; f < 30; f++ ) {
            var frame = {
                duration: 6,
                pixels: []
            };

            for( var i = 0; i < 30; i++ ) {
                var color = one(colors[Players.id]).saturation(0.1);

                // one player segment
                for( var j = 0; j < ledsPP; j++ ) {
                    if(i==(f+j)%30){
                        color = color.saturation(1);
                    }
                }

                frame.pixels.push([
                    Math.round(255 * color.red()),
                    Math.round(255 * color.green()),
                    Math.round(255 * color.blue())
                ]);
            }
            animation.push( frame );
        }
        Homey.manager('ledring').animate(animation);
    },
    rotateColor: function(curColor){
        var animation = [];
        for( var f = 0; f < 30; f++ ) {
            var frame = {
                duration: 10,
                pixels: []
            };

            for( var i = 0; i < 30; i++ ) {
                var color = one(curColor).saturation(0.1);

                // create a tail
                for( var j = 0; j < 4; j++ ) {
                    if( (i+j)%30 == f ) {
                        color = color.saturation(1/(j+1));
                    }
                }

                frame.pixels.push([
                    Math.round(255 * color.red()),
                    Math.round(255 * color.green()),
                    Math.round(255 * color.blue())
                ]);
            }
            animation.push( frame );
        }
        Homey.manager('ledring').animate(animation);
    },
    bang: function(){
        var animation = [];
        var brightness = 1;
        for( var f = 0; f < 30; f++ ) {
            var frame = {
                duration: 10,
                pixels: []
            };

            for( var i = 0; i < 30; i++ ) {
                var color = one('red').saturation(brightness);
                // decrease brightness
                frame.pixels.push([
                    Math.round(255 * color.red()),
                    Math.round(255 * color.green()),
                    Math.round(255 * color.blue())
                ]);
            }

            animation.push( frame );
            brightness = brightness - 0.03;

        }
        Homey.manager('ledring').animate(animation);
        if(f == 30){
            this.stop();
        }
    },
    stop: function(){
        var animation = [];
        Homey.manager('ledring').animate(animation);
    }
};