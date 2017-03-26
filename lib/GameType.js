var keystone = require('keystone');
var _ = require('underscore');

module.exports = function(gameSession) {

    var _SESSION_CONFIG = gameSession;
    var _PLAYERS = [];

    this.PlayerReady = function(player) {

        _PLAYERS.push(player);

    }
    
};