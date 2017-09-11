'use strict';

/**
 * @Stake v3
 * Developed by Engagement Lab, 2016-2017
 * ==============
 * Common functionality game controller
 *
 * @class lib/games
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */

class Common {

    constructor() {

        super();

        this.Templates,
        this.Session = coreModule.SessionManager,
        this.events = require('events'),
        this.eventEmitter = new this.events.EventEmitter(),

        // Identifies targets for socket events
        this.players_id,
        this.keystone = require('keystone');

    }

    Initialize(gameSession, callback) {

        super.Initialize(gameSession, require('keystone'), require('app-root-path'), () => {

            var GameConfig = this.keystone.list('GameConfig').model;
            var Deck = this.keystone.list('Deck').model;

            this.assignedRoleIndices = [];

            this._countdown_paused = false;
            this._player_timeout_duration = 60000;

            // Init session
            this._game_session = gameSession;

            // Init template loader with current game type
            var TemplateLoader = require('./TemplateLoader');
            this.Templates = new TemplateLoader(gameSession.gameType);

            // Identify targets for socket events
            this.players_id = gameSession.accessCode;
            // Override: players_id and group are same for @Stake (decider-only filtered by client)
            this.group_id = this.players_id;

            var queryDeck = Deck.findById(gameSession.deckId).populate('roles');

            // Get data about this session's deck
            queryDeck.exec((err, deckData) => {

                this._deck_data = deckData;
                this._active_deck_roles = deckData.roles;

                callback();

            });

        });
        
        
    }

    /**
    * @override
    */
    Reset() {

        super.Reset();

        this.assignedRoleIndices = [];
        this._deliberate_time_queue = [];

    }

    /**
    * @override
    */
    EndGame(socket) {

        this.End(socket, true);

    }

    GetConfig() {

        return this._config;

    }

    // Get active players (all non-deciders)
    GetActivePlayers() {

        let players = _.pick(this._current_players, 
                        function(val, key, obj) { 
                            return (val.decider === false) || (val.decider === undefined);
                        });

        return players;

    }

    // Get disconnected players
    GetDisconnectedPlayers() {

        let players = _.pick(this._current_players, 
                        function(val, key, obj) { 
                            return (val.connected === false);
                        });

        return players;

    }

    // Get active player (it's their turn)
    GetActivePlayerData() {

        let players = this.GetActivePlayers();
        let uids = Object.keys(players);

        return players[uids[this._active_player_index]];

    }

    // Get if player w/ provided uid is decider
    IsDecider(uid) {

        if(!this._current_players[uid])
            return false;

        return this._current_players[uid].decider;

    }

    AssignRoleToPlayer(player, socket, isDecider) {

        let playerObj = this._current_players[player.uid];

        // Is decider (ensure falsey is false)?
        if(!isDecider)
            playerObj.decider = false;
        else {

            // Player is decider; no role this turn
            this._current_decider = player;
            playerObj.decider = true;
            playerObj.role = { title: 'Decider' };

            // Tell new decider to start being decider
            if(this.groupSocket)
                this.groupSocket.to(this._current_decider.socket_id).emit('game:decider', true);

            return;

        }

        let availableRoleIndices = _.range(0, this._active_deck_roles.length)

        // Remove previously assigned roles, if applicable and those assigned to others
        let unavaiable = this.assignedRoleIndices;
        if(!playerObj.prior_roles)
            unavaiable = _.union(playerObj.prior_roles, this.assignedRoleIndices);

        // Remove used indices
        availableRoleIndices = _.difference(availableRoleIndices, unavaiable);

        // Assign random role
        let roleIndex = availableRoleIndices[_.random(0, availableRoleIndices.length-1)];
        let newRole = this._active_deck_roles[roleIndex];

        // Assign role to player object
        if(playerObj) {

            if(!newRole)
                throw new Error("Unable to assign role for player " + playerObj.uid);

            playerObj.role = newRole;

            // Track prior roles so not assigned again
            if(!playerObj.prior_roles)
                playerObj.prior_roles = [roleIndex]
            else
                playerObj.prior_roles.push(roleIndex);

            this.assignedRoleIndices.push(roleIndex);
            
            this.Templates.Load('partials/shared/rolecard', newRole, (html) => {

                socket.to(playerObj.socket_id).emit('player:assignrole', html);

            });
        }

        // Replace cached object
        this._current_players[player.uid] = playerObj;

    }

    /**
     * Begin the game's tutorial.
     *
     * @class lib/games/Common
     */
    StartTutorial(socket) {

        this.Templates.Load('partials/group/tutorial', undefined, (html) => {
            
            socket.to(this.players_id).emit('game:tutorial', html);
        
        });

    }

    /**
    * @override
    */
    IsFull() {

        return (Object.keys(this._current_players).length === this.GetConfig().playerCountRangeMax);

    }

    /**
    * @override
    */
    ModeratorJoin(socket, player) { 

        super.ModeratorJoin(socket);

        this.PlayerReady(player, socket, true);

    }

    /**
    * @override
    */
    PlayerReady(player, socket, assignDecider) {

        let uids = Object.keys(this._current_players);
        let playerRejoining = _.contains(uids, player.uid+"");
        let isDecider = this.IsDecider(player.uid) || (assignDecider === true);

        // If player is flagged as trying to re-connect but is already connected, bail
        if(playerRejoining && this._current_players[player.uid].connected)
            return;

        // Invoke common method
        super.PlayerReady(player, socket, false);
 
        // Get any disconnected players and then if all players are active
        let disconnectedPlayers = this.GetDisconnectedPlayers();
        let allPlayersActive = _.isEmpty(disconnectedPlayers);

        if(playerRejoining) {

            let reconnectInfo = {};
            if(this._countdown_paused) {

                // Resume any current timers
                this._countdown_paused = false;

                // Tell player where to resume current timer
                reconnectInfo.resume_duration = this._countdown_duration;

            }

            // Is decider?
            reconnectInfo.is_decider = isDecider;

            reconnectInfo.disconnected_players = _.pluck(disconnectedPlayers, 'username');
            reconnectInfo.timeout_remaining = this._player_timeout_time_left;
            reconnectInfo.coins = this.Coins.GetCoinsForPlayer(parseInt(player.uid)).current;
            reconnectInfo.pot = this.Coins.GetPotAmount();

            // Set client to reconnected state
            if(isDecider)
                this._current_decider = player;
            
            socket.emit('player:reconnected', reconnectInfo);

            if(allPlayersActive)
                clearTimeout(this._player_timeout);
            
            let data = {
                            players: _.sortBy(this._current_players, function(player) {return player.index}),
                            disconnected_players: _.pluck(disconnectedPlayers, 'username'),
                            state: (playerRejoining ? 'player_rejoined' : 'gained_player'),
                            all_connected: allPlayersActive,
                            timeout_remaining: this._player_timeout_time_left
                       };
            socket.to(this.group_id).emit('players:update', data);
        }
        else
            this.AssignRoleToPlayer(player, socket, isDecider);

        this._player_icon_index++;

    }

    /**
    * @override
    */
    PlayerLost(playerSocketId, socket) {

        let thisPlayer = this.GetPlayerById(playerSocketId);

        if(!thisPlayer)
            return;

        thisPlayer.connected = false;

        // If game is currently in session...
        if(this._game_in_session) {

            // Pause any current timers
            this._countdown_paused = true;

            // Get all currently disconnected players
            let missingPlayers = _.pluck(this.GetDisconnectedPlayers(), 'username');

            // Don't remove, just tell everyone they left
            socket.to(this.players_id).emit('player:lost', {names: missingPlayers, timeout: this._config.timeTimeoutPlayer});

            // Clear current timeout, if there is one
            if(this._player_timeout)
                clearTimeout(this._player_timeout);

            this._player_timeout_time_left = this._config.timeTimeoutPlayer;
            this._player_timeout = setInterval(() => {

                this._player_timeout_time_left--;

                if(this._player_timeout_time_left === 0) {

                    if(!this._game_in_session)
                        return;
                    
                    this.End(socket, true)

                }

            }, 1000);

        }
        // ...otherwise, kick 'em out now
        else
            this.PlayerRemove(thisPlayer);


    }

    /**
    * @override
    */
    PlayerRemove(player) {

        super.PlayerRemove(player);

        this._current_player_index--;

    }

    /**
    * @override
    */
    AdvanceRound(socket) {

        // Invoke common method
        super.AdvanceRound(this.groupSocket);

        // End game if round > 2
        if(this._current_round === 3) 
            this.End(socket);

        // Reset active deck roles 
        this._active_deck_roles = this._deck_data.roles;

        // Reset active player
        this._active_player_index = 0;

        // Tell current decider to stop being decider
        this.groupSocket.to(this._current_decider.socket_id).emit('game:decider', false);

        _.each(this._current_players, (player, index) => {

            let isDecider = (this._current_winner.uid === player.uid);
           
            // Assign new decider and new roles
            this.AssignRoleToPlayer(player, socket, isDecider);
        
        });

        // Nullify winner for new round
        this._current_winner = null;

    }
}

module.exports = Common;