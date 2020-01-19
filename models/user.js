//importing node core files


//importing third party packages
const Sequelize = require('sequelize');

//importing my files
const database = require('../util/database');

const user = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        key: true,
    },
    password: {
        type: Sequelize.STRING
    }
});

module.exports = user;