const Router = require('koa-router');
const R = require('../API/Rgirl');

var router = new Router({
   prefix: '/rgirls'
});

router.post('/gregist',async (ctx) =>{
    console.log(ctx.request.body);
    await R.rgirlRegist(ctx.request.body);
    ctx.body = '申请提交成功，请等待系统通知';
});

router.post('/rregist',async (ctx) =>{
    console.log(ctx.request.body);
    await R.rentRegist(ctx.request.body);
    ctx.body = '申请提交成功，待审核无误后我们会尽快将信息交由至GID对应租借女友，待对方确认后会将其' +
        '联系方式交由您，彼时希望小主您能主动电话沟通Grgirl确认细节，使对方及时填写信息表单，谢谢您的配合，祝您date愉快！'
});

router.post('/getmessage',async (ctx) =>{
    ctx.body = await R.getMessage(ctx.request.body)
});

router.post('/messages',async (ctx) =>{
    ctx.body = await R.getMessages();
});

module.exports = router;
