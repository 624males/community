const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/zys',{ useNewUrlParser: true ,useUnifiedTopology: true});
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{//con部分可省略，目的是为了检测连接以及连接成功后再进行操作
    //定义一个schema
    let Schema = mongoose.Schema({
        category:String,
        name:String
    });
    Schema.methods.eat = function(){
        console.log("I've eatten one "+this.name);
    }
    //继承一个schema
    let Model = mongoose.model("fruit",Schema);
    //生成一个document
    let apple = new Model({
        category:'apple',
        name:'apple'
    });
    //存放数据
    apple.save((err,apple)=>{
        if(err) return console.log(err);
        apple.eat();
        //查找数据
        Model.find({name:'apple'},(err,data)=>{
            console.log(data);
        })
    });
})
