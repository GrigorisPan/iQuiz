class Players {
  constructor() {
    this.players = [];
  }
  addPlayer(hostId, playerId, playerIp, name, gameData, previousGameData) {
    var player = {
      hostId,
      playerId,
      playerIp,
      name,
      gameData,
      previousGameData,
    };
    this.players.push(player);
    return player;
  }
  removePlayer(playerId) {
    var player = this.getPlayer(playerId);

    if (player) {
      this.players = this.players.filter(
        (player) => player.playerId !== playerId
      );
    }
    return player;
  }
  getPlayer(playerId) {
    return this.players.filter((player) => player.playerId === playerId)[0];
  }
  getPlayers(hostId) {
    return this.players.filter((player) => player.hostId === hostId);
  }
  getEnablePlayers(hostId) {
    return this.players.filter(
      (player) => player.hostId === hostId && player.gameData.enable === true
    );
  }
}

module.exports = { Players };
