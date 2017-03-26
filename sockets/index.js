module.exports = function(app) {

  var io = require('socket.io')(app);

io.on('connection', function (socket) {

    console.log("Player connection", socket.id)

    // Create event handlers for this socket
    var eventHandlers = {
        // hashtag: new HashtagHandler(io, socket),
        login: new PlayerLogin(io, socket)
    };

    // Bind events to handlers
    for (var category in eventHandlers) {
        var handler = eventHandlers[category].handler;
        for (var event in handler) {
            socket.on(event, handler[event]);
        }
    }

    socket.send(socket.id);

  });

  console.log('erica-game: socket.io inititalized');

}