//数据库操作API
const User = require('../db/users');
const Manager = require('../db/manager');
const cUser = require('../db/createUser');
const cTitle = require('../db/cTitle');

class UserInfo {
//用户注册
    static async userRegist(data) {
        return await User.create({
            UserName: data.UserName,
            Password: data.Password,
            Tel: data.Tel,
        })
    }

//获取某用户数据
    static async getUser(UserName) {
        return await User.findOne({
            where: {
                UserName:UserName
            }
        })
    }

//获取所有用户数据
    static async getUsers(){
        return await User.findAll()
    }

//创建标题
    static async cTitle(data) {
        return await cTitle.create({
            UserName: data.UserName,
            Title: data.Title,
            Module: data.Module,
        })
    }

//删除标题
    static async dTitle(data) {
        return await cTitle.destroy({
            where:{
                Title:data.Title
            }
        })
    }

//用户功能之添加文本
    static async cContent(data) {
        const x = await cUser(data.UserName);
        await x.sync({force: false});
        return await x.create({
            UserName:data.UserName,
            Content:data.Content,
            Title: data.Title,
            Module: data.Module
        })
    }

//删除文本
    static async dContent(data) {
        const x = await cUser(data.UserName);
        await x.sync({force: false});
        return await x.destroy({
            where:{
                Title:data.Title
            }
        })
    }

//根据标题返回文章
    static async fArticle(data) {
        const x = await cUser(data.UserName);
        return await x.findOne({
            where: {
                Title:data.Title
            }
        })
    }

//PostList获得所有标题
    static async getTitles() {
        return await cTitle.findAll()
    }

//根据文章的文章作者名获取对应写过的的文章标题
    static async getUserinfo(data) {
        return await cTitle.findAll(
            {
                where:{
                    UserName:data
                }
            }
        )
    }

//管理员注册
    static async managerRegist(data) {
        return await Manager.create({
            ManagerName: data.ManagerName,
            Password: data.Password,
        })
    }

//管理员信息获取
    static async getManager(ManagerName) {
        return await Manager.findOne({
            where: {
                ManagerName
            }
        })
    }

}

module.exports = UserInfo;
