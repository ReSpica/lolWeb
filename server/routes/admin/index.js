module.exports = app=>{
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')


    router.post('/categories',async (req,res)=>{
        const model = await Category.create(req.body)
        res.send(model)
    })

    router.put('/categories/:id',async (req,res)=>{
        const model = await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    router.delete('/categories/:id',async (req,res)=>{
        await Category.findByIdAndDelete(req.params.id,req.body)
        res.send({
            code:'0000',
            msg:'分类删除成功'
        })
    })

    router.get('/categories',async (req,res)=>{
        const items = await Category.find().limit(10).populate('parent')
        res.send(items)
    })

    router.get('/categories/:id',async (req,res)=>{
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    app.use('/admin/api',router)
}