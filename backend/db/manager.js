//管理者汇总表
const sequelize = require('./config');
const Sequelize = require('sequelize');

var Manager = sequelize.define('manager',{
    ManagerName: {
        type: Sequelize.STRING,
        allownull:false,
        field: 'ManagerName' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    Password: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Password'
    },
}, {
    freezeTableName: true // Model 对应的表名将与model名相同
});

Manager.sync({ force: false });//当为true时会强制删表新建

module.exports = Manager;

