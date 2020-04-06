const express = require('express')

const app = express()
app.set('secret','spica')//设置一个全局的常量，用于设置和识别token
app.use(require('cors')())
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads'))//访问图片的路径
require('./routes/admin/index.1')(app)
require('./routes/web/index')(app)
require('./plugins/db')(app)

app.listen(3000,()=>{
    console.log('服务端已经启动，端口号为：3000')
})