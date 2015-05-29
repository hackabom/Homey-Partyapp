// Players module
module.exports = {
    total: 0,
    names: [],
    id: [],
    selectedPlayer: 0,
    numberOfPlayers: 0,
    // Add player with playerName
    addPlayer: function (playerName) {

        // Add player
        this.names.push(playerName);
        this.id.push(this.total);
        this.total++;

        // Remaining players to add
        if (this.total < this.numberOfPlayers) {
            this.askForNewPlayer();
        }
        // Setup done
        else {
            Homey.log("What game would you like to play, Russian Roulette, Twister or Spin the Bottle? ");
        }
    },
    // Make homey ask for the name of a new player
    askForNewPlayer: function () {
        Homey.log("What is the name of player " + (this.total + 1) + "?");
    },
    // Set next player as current player
    setNextPlayer: function () {

        // If end of user array reached, start over
        if(this.selectedPlayer == this.names.length - 1){
            this.selectedPlayer = 0;
        } else {
            this.selectedPlayer++;
        }
    },
    // Returns name of player currently at turn
    getCurrentPlayer: function () {
        return this.names[this.selectedPlayer];
    }
};