const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'zys', // 数据库名
    'zys',// 用户名
    '521lczys', // 密码
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        // 格式化时间
        dialectOptions: {
            dateStrings: true,
            typeCast: true
        },
        timezone: '+08:00' //改为标准时区
    },
)

module.exports = sequelize
