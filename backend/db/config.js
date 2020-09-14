const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'zys', // 数据库名
    'zys',// 用户名
    '521lczys', // 密码
    {
        host: 'rm-bp1h6a1vg5963ajx9wo.mysql.rds.aliyuncs.com',
        port:'3306',
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
