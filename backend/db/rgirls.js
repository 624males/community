const sequelize = require('./config');
const Sequelize = require('sequelize');

var Rgirls = sequelize.define('rgirls', {
    Name: {
        type: Sequelize.STRING,
        allownull:false,
        field: 'Name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    Price: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Price'
    },
    Tel: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Tel'
    },
    Types: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Types'
    },
    Dates: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Dates'
    },
    Reason: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Reason'
    },
    Rate: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Rate'
    },
    Times: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Times'
    },
    UserName: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'UserName'
    },
}, {
    freezeTableName: true // Model 对应的表名将与model名相同
});

Rgirls.sync({ force: false });

module.exports = Rgirls;
