let socket;

module.exports = {
    initialize: httpServer => {
        return socket = require('socket.io')(httpServer);
    },
    getSocket: () => {
        if(!socket)
            throw new Error("not initialized");
        return socket;
    }

}