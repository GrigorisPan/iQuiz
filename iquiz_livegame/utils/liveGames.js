class LiveGames {
  constructor() {
    this.games = [];
  }

  addGame(pin, hostId, gameLive, gameData, banData) {
    const game = { pin, hostId, gameLive, gameData, banData };
    this.games.push(game);
    return game;
  }

  addBanData(game, data) {
    game.banData.push(data);
  }

  removeGame(hostId) {
    let game = this.getGame(hostId);

    if (game) {
      this.games = this.games.filter((game) => game.hostId !== hostId);
    }
    return game;
  }
  getGame(hostId) {
    return this.games.filter((game) => game.hostId == hostId)[0];
  }
  checkPinGame(pin) {
    let uniquePin = true;
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].pin === pin) {
        uniquePin = false;
      }
    }
    return uniquePin;
  }
}

module.exports = { LiveGames };
