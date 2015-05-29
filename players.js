
// Players object
module.exports = {
    total: 0,
    names: [],
    id: [],
    selectedPlayer: 0,
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
            Homey.log("What game would you like to play?");
            setupDone = true;
        }
    },
    askForNewPlayer: function () {
        Homey.log("What is the name of player " + (this.total + 1) + "?");
    },
    setNextPlayer: function () {
        if(this.selectedPlayer == this.names.length - 1){
            this.selectedPlayer = 0;
        } else {
            this.selectedPlayer++;
        }
    },
    getCurrentPlayer: function () {
        return this.names[this.selectedPlayer];
    }
};