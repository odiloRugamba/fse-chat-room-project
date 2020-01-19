const Message = require('../models/message');
const User = require('../models/user');
const socket = require('../util/socket');

exports.getChat = (req, res, next) => {
    Message.findAll({include: [User]})
    .then(messages=> {
        res.render('chat', {me: req.user.username, messages: messages});
    })
    .catch(err => {
        console.log(err);
    })
    
}
exports.postMessage = (req, res, next) => {
    const message = req.body.message;
    Message.create({message: message, userId: req.user.id});
    let time = new Date();
    socket.getSocket().emit('new-message',{sender: req.user.username, time:  time.getDate() + '.' + (time.getMonth() + 1 ) + '.' + time.getFullYear() +' ' + time.getHours() + ':' + time.getMinutes(), message: message})
    
} 