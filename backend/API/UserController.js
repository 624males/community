const User = require('./User')
//引入jwt做token验证
const jwt = require('jsonwebtoken')

verToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token.split(' ')[1],'123456', (error, decoded) => {
            error ? reject(error) : resolve(decoded);
        });
    });
};


class UserController {
    static async Create(ctx) {
        const req = ctx.request.body;
        if (req.UserName && req.Password && req.Tel) {
                    try {
                        const query = await User.getUser(req.UserName);
                        if (query) {
                            ctx.response.status = 200;
                            ctx.body = {
                                code: -1,
                                desc: '用户已存在'
                            }
                        } else {
                            const param = {
                                Password: req.Password,
                                Tel: req.Tel,
                                UserName: req.UserName
                            };
                            const data1 = await User.userRegist(param);
                            ctx.response.status = 200;
                            ctx.body = {
                                code: 0,
                                desc: '用户注册成功',
                                userInfo: {
                                    Tel: req.Tel,
                                    UserName: req.UserName,
                                    Password: req.Password
                                }
                            }
                        }

            } catch (error) {
                ctx.response.status = 416;
                ctx.body = {
                    code: -2,
                    desc: '参数不齐全'
                }
            }
        }
    }

    //密码登陆
    static async Login(ctx) {
        const req = ctx.request.body;
            const data = await User.getUser(req.UserName);
            if (data) {
                if (data.Password === req.Password) {
                    //生成token，验证登录有效期
                    const token = jwt.sign({
                        Password: req.Password,
                    }, '123456', { expiresIn: '360000s' });
                    const info = {
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        UserName: data.UserName
                    };
                    return ctx.body = {
                        code: 0,
                        token: token,
                        userInfo: JSON.stringify(info),
                        desc: '登陆成功'
                    }
                } else {
                    return ctx.body = {
                        code: -1,
                        desc: '用户密码错误'
                    }
                }
            } else {
                return ctx.body = {
                    code: -2,
                    desc: '该用户尚未注册'
                }
            }
        };

    //获取用户信息(除密码外)
    static async GetUser(ctx){
        const req = ctx.request.body;
        const token = ctx.request.header.authorization;
        if(token){
            try {
                const aa = await verToken(token)
                console.log(aa)
                console.log(req)
                if (!req.UserName) {
                    return ctx.body = {
                        code: -1,
                        desc: '参数错误'
                    }
                } else {
                    let data = await User.getUser(req.UserName);
                    if (aa.Password == data.Password) {
                        const info = {
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt,
                            Password: data.Password,
                        };
                        return ctx.body = {
                            code: 0,
                            userInfo: JSON.stringify(info),
                            desc: '获取用户信息成功'
                        }
                    }
                }
            } catch (error) {
                console.log(error)
                ctx.status = 401;//401即用户无访问权限，需要身份验证
                return ctx.body = {
                    code: -2,
                    desc: '登陆过期，请重新登陆'
                }
            }
        }else{
            ctx.status = 401;
            return ctx.body = {
                code: -2,
                desc: '登陆过期，请重新登陆'
            }
        }
    }

}

module.exports = UserController
