module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })
    // const Category = require('../../models/Category')


    router.post('/', async (req, res) => {
        const one = await req.Model.create(req.body)
        res.send(one)
    })

    router.put('/:id', async (req, res) => {
        const one = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(one)
    })

    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            code: '0000',
            msg: '删除成功'
        })
    })

    router.get('/', async (req, res) => {
        var queryOptions = {}
        console.log(req.Model.modelName);//Category
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().limit(10).setOptions(queryOptions)
        res.send(items)
    })

    router.get('/:id', async (req, res) => {
        const one = await req.Model.findById(req.params.id)
        res.send(one)
    })
    app.use('/admin/api/respica/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)



    //上传
    const multer = require('multer');
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    //登陆
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body;
        //1.找用户
        const AdminUser = require('../../models/AdminUser')
        const user = await AdminUser.findOne({
            username: username
        }).select('+password')
        if (!user) {
            return res.status(442).send({
                message: '用户不存在'
            })
        }
        //2.校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        if (!isValid) {
            return res.status(422).send({
                message: '密码错误'
            })
        }
        //3.返回token
        const jwt = require('jsonwebtoken')
        const token = jwt.sign({
            _id: user._id,
        }, app.get('secret'))
        res.send({
            msg:'登陆成功',
            username:user.username,
            token:token
        })
    })






}