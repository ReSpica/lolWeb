module.exports = app=>{
    const express = require('express')
    const router = express.Router({
        mergeParams:true
    })
    // const Category = require('../../models/Category')


    router.post('/',async (req,res)=>{
        const one = await req.Model.create(req.body)
        res.send(one)
    })

    router.put('/:id',async (req,res)=>{
        const one = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(one)
    })

    router.delete('/:id',async (req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            code:'0000',
            msg:'删除成功'
        })
    })

    router.get('/',async (req,res)=>{
        var queryOptions = {}
        console.log(req.Model.modelName);//Category
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().limit(10).setOptions(queryOptions)
        res.send(items)
    })

    router.get('/:id',async (req,res)=>{
        const one = await req.Model.findById(req.params.id)
        res.send(one)
    })
    app.use('/admin/api/respica/:resource',async(req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)


    const multer = require('multer');
    const upload = multer({dest:__dirname + '/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })







}