module.exports = app =>{
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/spica-lolWeb',{
        useNewUrlParser:true
    })

    require('require-all')(__dirname + '/../models')
}