const Router = require('koa-router')
const managerController = require('../API/ManagerController')
const User = require('../API/User')

const router = new Router({
    prefix: '/manager'
});


//用户注册
router.post('/regist',managerController.Create)

//密码登陆
router.post('/login',managerController.Login)

//获取用户信息
router.post('/getmanager',managerController.GetManager)

//main2获取用户名
router.get('/getusers',async (ctx)=>{
    ctx.body = await User.getUsers()
})

router.post('/delete',async (ctx)=>{
    const x = ctx.request.body
    await console.log(x)
    await User.dContent(x)
    await User.dTitle(x)
    ctx.body = 1
})


module.exports = router
