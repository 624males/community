const User = require('../db/mysqldb')
const Manager = require('../db/manager')
const cUser = require('../db/createUser')
const cTitle = require('../db/cTitle')

class UserInfo {

    static async userRegist(data) {
        return await User.create({
            UserName: data.UserName,
            Password: data.Password,
            Tel: data.Tel,
        })
    }

    static async getUser(UserName) {
        return await User.findOne({
            where: {
                UserName
            }
        })
    }

    static async cTitle(data) {
        return await cTitle.create({
            UserName: data.UserName,
            Title: data.Title,
            Module: data.Module,
        })
    }

    static async cContent(data) {
        const x = await cUser(data.UserName)
        await x.sync({force: false});
        return await x.create({
            UserName:data.UserName,
            Content:data.Content,
            Title: data.Title,
            Module: data.Module
        })
    }

    static async fArticle(data) {
        const x = await cUser(data.UserName)
        return await x.findOne({
            where: {
                Title:data.Title
            }
        })
    }

    static async getTitles() {
        return await cTitle.findAll()
    }

    static async getUserinfo(data) {
        return await cTitle.findAll(
            {
                where:{
                    UserName:data
                }
            }
        )
    }

    static async managerRegist(data) {
        return await Manager.create({
            ManagerName: data.ManagerName,
            Password: data.Password,
        })
    }

    static async getManager(ManagerName) {
        return await Manager.findOne({
            where: {
                ManagerName
            }
        })
    }

}

module.exports = UserInfo
