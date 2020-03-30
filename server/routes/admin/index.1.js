module.exports = app=>{
    const express = require('express')
    const router = express.Router({
        mergeParams:true
    })
    // const Category = require('../../models/Category')


    router.post('/',async (req,res)=>{
        console.log('???????',req.params.resource);
        const Model = require(`../../models/${req.params.resource}`)
        const items = await Model.create(req.body)
        res.send(items)
    })

    router.put('/:id',async (req,res)=>{
        const model = await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    router.delete('/:id',async (req,res)=>{
        await Category.findByIdAndDelete(req.params.id,req.body)
        res.send({
            code:'0000',
            msg:'分类删除成功'
        })
    })

    router.get('/',async (req,res)=>{
        console.log('????',req.params.resource)
        const Model = require(`../../models/${req.params.resource}`)
        const items = await Model.find().limit(10).populate('parent')
        res.send(items)
    })

    router.get('/:id',async (req,res)=>{
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    app.use('/admin/api/respica/:resource',router)
}