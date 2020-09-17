//新增用户文章标题，主页调用所需
const sequelize = require('./config');
const Sequelize = require('sequelize');

var CTitle = sequelize.define('CTitle', {
    UserName: {
        type: Sequelize.STRING,
        allownull:false,
        field: 'UserName' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    Title: {
        type: Sequelize.STRING,
        allownull: false,
        field: 'Title'
    },
    Module:{
        type: Sequelize.STRING,
        allownull: false,
        field: 'Module'
    },
}, {
    freezeTableName: true // Model 对应的表名将与model名相同
});

CTitle.sync({ force: false });

module.exports = CTitle;
