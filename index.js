//importing core node file
const path = require('path');


//importing third party files
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');



//importing my files
const authRoutes = require('./routes/authentication');
const chatRoutes = require('./routes/chat');
const sequelize = require('./util/database');
const User = require('./models/user');
const Message = require('./models/message');
const check = require('./util/check');

const app = express();
//setting express to use ejs rendering content
app.set('view engine', 'ejs');
//setting default folder to views
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
Message.belongsTo(User, {foreignKey: 'userId', constraints: true, onDelete: 'CASCADE'});
User.hasMany(Message, {foreignKey: 'userId',});
app.use(session({secret: '3jnvsPKGeChvDt!', resave: false, saveUninitialized: false}));


app.use('/auth', authRoutes);
app.use('/',check.check, chatRoutes);

app.use('/', (req, res, next) => {
    res.status(404).render('404');
});

console.log("Started");

sequelize.sync()
.then(result => {
    //console.log(result)
})
.catch(err => {
    console.log(err)
});

const server = app.listen(3000);
const socket = require('./util/socket').initialize(server);
socket.on('connection', clt => {
    const Client = require('./util/client');
    Client.setClient(clt);
    console.log('connected new user');
})
