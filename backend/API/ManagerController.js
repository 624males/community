const User = require('./User')
const jwt = require('jsonwebtoken')

verToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token.split(' ')[1],'123456', (error, decoded) => {
            error ? reject(error) : resolve(decoded);
        });
    });
};

class ManagerController {
    static async Create(ctx) {
        const req = ctx.request.body;
        await console.log(req);
        if (req.ManagerName && req.Password) {
            try {
                const query = await User.getManager(req.ManagerName);
                if (query) {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: -1,
                        desc: '用户已存在'
                    }
                } else {
                    const param = {
                        Password: req.Password,
                        ManagerName: req.ManagerName
                    }
                    const data1 = await User.managerRegist(param);
                    ctx.response.status = 200;
                    ctx.body = {
                        code: 0,
                        desc: '用户注册成功',
                        userInfo: {
                            ManagerName: req.ManagerName,
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
        await console.log(req)
        if (!req.ManagerName || !req.Password) {
            return ctx.body = {
                code: '-1',
                msg: '用户名或密码不能为空'
            }
        } else {
            const data = await User.getManager(req.ManagerName);
            if (data) {
                if (data.Password === req.Password) {
                    //生成token，验证登录有效期
                    const token = jwt.sign({
                        Password: req.Password,
                        ManagerName:req.ManagerName
                    }, '123456', { expiresIn: '360000s' });
                    const info = {
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        Id: data.Id
                    }
                    return ctx.body = {
                        code: '0',
                        token: token,
                        managerInfo: JSON.stringify(info),
                        desc: '登陆成功'
                    }
                } else {
                    return ctx.body = {
                        code: '-1',
                        desc: '用户密码错误'
                    }
                }
            } else {
                return ctx.body = {
                    code: '-1',
                    desc: '该用户尚未注册'
                }
            }
        };
    }

    //获取用户信息(除密码外)
    static async GetManager(ctx){
        const req = ctx.request.body;
        const token = ctx.request.header.authorization;
        if(token){
            try {
                const aa = await verToken(token)
                console.log(aa)
                console.log(req)
                if (!aa.Password) {
                    return ctx.body = {
                        code: '-1',
                        desc: '参数错误'
                    }
                } else {
                    let data = await User.getManager(aa.ManagerName);
                    if (aa.Password == data.Password) {
                        const info = {
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt,
                            Password: data.Password,
                        };
                        console.log(data)
                        return ctx.body = {
                            code: '0',
                            ManagerInfo: JSON.stringify(info),
                            desc: '获取用户信息成功'
                        }
                    }
                }
            } catch (error) {
                console.log(error)
                ctx.status = 401;
                return ctx.body = {
                    code: '-1',
                    desc: '登陆过期，请重新登陆'
                }
            }
        }else{
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: '登陆过期，请重新登陆'
            }
        }
    }
}

module.exports = ManagerController
