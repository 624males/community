const sequelize = require('./config');
const Sequelize = require('sequelize');

var Rent = sequelize.define('rents', {
    Name: {
        type: Sequelize.STRING,
        allownull:false,
        field: 'Name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    Gname: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Gname'
    },
    Tel: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Tel'
    },
    Btime: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Btime'
    },
    Date: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Date'
    },
    Etime: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Etime'
    },
    Desc: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Desc'
    },
    Activity: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Activity'
    },
}, {
    freezeTableName: true // Model 对应的表名将与model名相同
});

Rent.sync({ force: false });

module.exports = Rent;
