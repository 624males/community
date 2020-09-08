const sequelize = require('./config')
const Sequelize = require('sequelize')

var User = sequelize.define('user', {
    UserName: {
        type: Sequelize.STRING,
        allownull:false,
        field: 'UserName' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    Password: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Password'
    },
    Tel: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Tel'
    },
}, {
    freezeTableName: true // Model 对应的表名将与model名相同
});

User.sync({ force: false });

module.exports = User;
