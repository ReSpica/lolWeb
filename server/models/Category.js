const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    name:{type:String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}
})

schema.virtual('childen',{
    localField:'_id',
    foreignField:'parent',
    justOne:false,
    ref:'Category'
})

schema.virtual('newLists',{
    localField:'_id',
    foreignField:'categories',
    justOne:false,
    ref:'Article'
})

module.exports = mongoose.model('Category',schema)