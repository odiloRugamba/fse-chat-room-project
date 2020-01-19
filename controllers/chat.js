const message = require('../models/message');
const socket = require('../util/socket');


const Message = require('../models/message');
exports.getChat = (req, res, next) => {
    message.findAll()
    .then(messages=> {
        res.render('chat', {messages: messages});
    })
    .catch(err => {
        console.log(err);
    })
    
}
exports.postMessage = (req, res, next) => {
    const message = req.body.message;
    Message.create({message: message, userId: req.user.id})
    socket.getSocket().emit('new-message',{sender: req.user.username, time: Date.now(), message: message})

    
} 