//importing node core files


//importing third party packages
const Sequelize = require('sequelize');

//importing my files
const database = require('../util/database');

const Message = database.define('message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    message: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER
    }

})


module.exports = Message;
