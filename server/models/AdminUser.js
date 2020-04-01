const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    username:{type:String},
    password:{type:String,set:function(val){
        return require('bcrypt').hashSync(val,10)
    },select:false}
})



module.exports = mongoose.model('AdminUser',schema)