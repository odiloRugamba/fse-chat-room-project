let socket;

module.exports = {
    initialize: httpServer => {
        return socket = require('socket.io')(httpServer);
    },
    getSocket: () => {
        return socket;
    }
}