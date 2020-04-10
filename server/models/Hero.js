const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    name:{type:String},
    avatar:{type:String},
    picture:{type:String},
    title:{type:String},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    scores:{
        difficult:{type:Number}, //难度
        worth:{type:Number}  //推荐指数
    },
    skills:[{           
        icon:{type:String},//技能图片
        name:{type:String},//技能名字
        description:{type:String},//技能描述
        tips:{type:String}//技能提示
    }],
    items1:[
        {type:mongoose.SchemaTypes.ObjectId,ref:'Item'}  //顺风出装
    ],
    items2:[
        {type:mongoose.SchemaTypes.ObjectId,ref:'Item'}  //逆风出装
    ],
    usageTip:{type:String},//使用技巧
    battleTip:{type:String},//对抗技巧
    teamTip:{type:String},//团战技巧
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description:{sype:String}
    }]
})



module.exports = mongoose.model('Hero',schema)