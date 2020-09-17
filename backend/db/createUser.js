//每一个用户对应创建一个表存放文章等数据
const sequelize = require('./config');
const Sequelize = require('sequelize');

var cUser = async (data)=> {
    return sequelize.define(data, {
        UserName: {
            type: Sequelize.STRING,
            allownull: false,
            field: 'UserName' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        Content: {
            type: Sequelize.STRING,
            allownull: false,
            field: 'Content'
        },
        Title: {
            type: Sequelize.STRING,
            allownull: false,
            field: 'Title'
        },
        Module: {
            type: Sequelize.STRING,
            allownull: false,
            field: 'Module'
        }
    }, {
        define:{freezeTableName: true} // Model 对应的表名将与model名相同
    });
};

module.exports = cUser;
