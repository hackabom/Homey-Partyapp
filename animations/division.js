module.exports = function(players,player){
	var colors = ['blue','red','green','yellow','orange','purple'];
	var players = 4;
	var player = 0;
	var ledsPP = Math.round(30/players);
	var animation = [];
	for( var f = 0; f < 30; f++ ) {
		var frame = {
			duration: 6,
			pixels: []
		};

		for( var i = 0; i < 30; i++ ) {			
			var color = Homey.color(colors[player]).saturation(0.1);
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
	return animation;

}