//sequelize所需数据库基本配置
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'zys', // 数据库名
    'zys',// 用户名
    '521lczys', // 密码
    {
        host: 'localhost',//RDS外网地址
        port:'3306',
        dialect: 'mysql',
        // 格式化时间
        dialectOptions: {
            dateStrings: true,
            typeCast: true
        },
        timezone: '+08:00' //改为标准时区
    },
);

module.exports = sequelize;
