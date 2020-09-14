const router = require('koa-router')()
const User = require('../API/User')
var multer = require('koa-multer')
//定义存储器
var storage = multer.diskStorage({
    //存储路径
    destination: function (req, file, cb) {
        cb(null, '../ufrontend/static')
    },
    //存储文件名
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
//运用存储器
var upload = multer({ storage: storage })

router.prefix('/users')

//uf
router.get('/titles', async (ctx)=>{
    ctx.body = await User.getTitles()
})

router.get('/userinfo/:x', async (ctx)=>{
    ctx.body = await User.getUserinfo(ctx.params.x)
})

router.post('/photos',upload.single('image'),async (ctx)=>{
    ctx.body = `../../static/${ctx.req.file.originalname}`
    console.log(ctx.req.file.originalname)
})


router.post('/ctitle', async (ctx)=>{
    const x = ctx.request.body;
    await User.cTitle(x);
})

router.post('/info', async (ctx)=>{
    const x = ctx.request.body;
    await User.cContent(x);
})

router.post('/article', async (ctx)=>{
    const x = ctx.request.body;
    console.log(x)
    ctx.body = await User.fArticle(x);
})


router.post('/user/:x', async (ctx)=> {
    ctx.body = await User.getUser(ctx.params.x)
    console.log(ctx.params.x)
})

router.post('/ww', async (ctx)=> {
    console.log(ctx.request.body)
})




module.exports = router
