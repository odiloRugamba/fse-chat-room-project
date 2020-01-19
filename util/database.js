//importing node core files


//importing third party packages
const Sequelize = require('sequelize');

//importing my files

const sequelize = new Sequelize('node-1', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});
module.exports = sequelize;