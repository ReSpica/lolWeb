module.exports = app => {
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const AdminUser = require('../../models/AdminUser');
    const assert = require('http-assert');
    const router = express.Router({
        mergeParams: true
    })

    //创建资源
    router.post('/', async (req, res) => {
        const one = await req.Model.create(req.body)
        res.send(one)
    })
    //修改资源
    router.put('/:id', async (req, res) => {
        const one = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(one)
    })
    //删除资源
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            code: '0000',
            msg: '删除成功'
        })
    })
    //资源列表
    router.get('/', async (req, res) => {
        var queryOptions = {}
        console.log(req.Model.modelName);//Category
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().limit(100).setOptions(queryOptions)
        res.send(items)
    })
    //资源详情
    router.get('/:id', async (req, res) => {
        const one = await req.Model.findById(req.params.id)
        res.send(one)
    })

    //需要通过token来判断用户的中间件
    const authMiddleware = async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop();
        assert(token, 401, '请提供请求头token');
        const { _id } = jwt.verify(token, app.get('secret'))
        assert(_id, 401, '这个token是无效的');
        req.user = await AdminUser.findById(_id);
        assert(req.user, 401, '当前token没有找到用户...');
        await next()
    }

    //获取对应model模块中间件
    const resourceMiddleware = async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${modelName}`)
        next()
    }

    //如果前端请求这个路由，首先判断token，再次是获取url中的resource得到专属的Model
    app.use('/admin/api/respica/:resource', authMiddleware,resourceMiddleware,router)



    //上传
    const multer = require('multer');
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload',authMiddleware,upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    //登陆
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body;
        //1.找用户
        const user = await AdminUser.findOne({
            username: username
        }).select('+password')
        // if (!user) {
        //     return res.status(442).send({
        //         message: '用户不存在'
        //     })

        // }
        assert(user, 422, '用户不存在')
        //2.校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        // if (!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        assert(isValid, 422, '密码错误')
        //3.返回token
        const token = jwt.sign({
            _id: user._id,
        }, app.get('secret'))
        res.send({
            msg: '登陆成功',
            username: user.username,
            token: token
        })
    })



    //错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })


}