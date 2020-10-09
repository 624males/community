const Rgirl = require('../db/rgirls');
const Rent = require('../db/rent');

class Rgirls {

    static async rgirlRegist(data){
        return await Rgirl.create({
            Name: data.Name,
            Price: data.Price,
            Tel: data.Tel,
            Types: data.Types,
            Dates: data.Dates,
            Reason: data.Reason,
            Times: data.Times,
            Rate: data.Rate,
            UserName: data.UserName
            }
        )
    }

    static async rentRegist(data){
        return await Rent.create({
            Name:data.Name,
            Gname:data.Gname,
            Tel:data.Tel,
            Btime:data.Btime,
            Etime:data.Etime,
            Date:data.Date,
            Desc:data.Desc,
            Activity:data.Activity,
        })
    }

    static async getMessage(data){
        return await Rent.findAll({
            where:{
                Gname: data.Gname,
            }
        })
    }

    static async getMessages(){
        return await Rgirl.findAll()
    }

}

module.exports = Rgirls;
