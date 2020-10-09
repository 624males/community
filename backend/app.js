const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
//使用koa-bodyparser解析数据
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
//koa2-cors解决跨域问题
const cors = require('koa2-cors');
//引入路由
const index = require('./routes/index');
const users = require('./routes/users');
const control = require('./routes/control');
const rgirls = require('./routes/rgirls');
//填入koa-jwt做用户信息验证
const koajwt = require('koa-jwt');

// error handler
onerror(app);

// middlewares
app.use(bodyparser(
    {
        jsonLimit: '5mb', // 控制body的parse转换大小 5mb
        formLimit: '4096kb'  //  控制你post的大小  2m
    }
));
app.use(json());
app.use(logger());
app.use(cors());

//利用koa-static解析静态文件
app.use(require('koa-static')(__dirname + '/public'));
//koa-views解析模板
app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger

app.use(koajwt({
    secret: '123456'
}).unless({//无需验证的路径
    path: [/^\/user\/regist/,/^\/user\/login/,/^\/users/,/^\/manager\/regist/,/^\/manager\/login/,/^\/manager\/getusers/,/^\/rgirls/]
}));

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  /*
  app.use调用中间件时，当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。
  当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。(洋葱模型)
  */
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(control.routes(),control.allowedMethods());
app.use(rgirls.routes(),rgirls.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
