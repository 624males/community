const Router = require('koa-router')
const userController = require('../API/UserController')

const router = new Router({
    prefix: '/user'
});


//用户注册
router.post('/regist',userController.Create)

//密码登陆
router.post('/login',userController.Login)

//获取用户信息
router.post('/getuser',userController.GetUser)



module.exports = router
