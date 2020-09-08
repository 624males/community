const Router = require('koa-router')
const managerController = require('../API/ManagerController')

const router = new Router({
    prefix: '/manager'
});


//用户注册
router.post('/regist',managerController.Create)

//密码登陆
router.post('/login',managerController.Login)

//获取用户信息
router.post('/getmanager',managerController.GetManager)



module.exports = router
