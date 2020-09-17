//前台功能路由
const router = require('koa-router')();
const User = require('../API/User');
//koa-multer用来实现上传文件存储
var multer = require('koa-multer');
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
});
//运用存储器
var upload = multer({ storage: storage });

router.prefix('/users');

//主页调取文章标题
router.get('/titles', async (ctx)=>{
    ctx.body = await User.getTitles()
});

//获得用户信息
router.get('/userinfo/:x', async (ctx)=>{
    ctx.body = await User.getUserinfo(ctx.params.x)
});

//新增标题
router.post('/ctitle', async (ctx)=>{
    const x = ctx.request.body;
    await User.cTitle(x);
});

//新增用户创作内容
router.post('/info', async (ctx)=>{
    const x = ctx.request.body;
    await User.cContent(x);
});

//点击标题查找对应文章
router.post('/article', async (ctx)=>{
    const x = ctx.request.body;
    ctx.body = await User.fArticle(x);
});

//点击用户头像获得用户所写文章等信息
router.post('/user/:x', async (ctx)=> {
    ctx.body = await User.getUser(ctx.params.x)
    console.log(ctx.params.x)
});

//将上传图片存放至指定位置并返回对应路径
router.post('/photos',upload.single('image'),async (ctx)=>{
    ctx.body = `../../static/${ctx.req.file.originalname}`;
});

module.exports = router;
