const express = require('express')

const app = express()
app.use(require('cors')())
app.use(express.json())
require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3000,()=>{
    console.log('服务端已经启动，端口号为：3000')
})