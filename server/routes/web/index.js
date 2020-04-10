module.exports = app => {
    const express = require('express');
    const router = express.Router()
    const mongoose = require('mongoose')
    const Category = require('../../models/Category')
    const Article = require('../../models/Article')
    const Hero = require('../../models/Hero')



    router.get('/news/list', async (req, res) => {
        // const cats = await Category.findOne({
        //     name: '新闻资讯'
        // }).populate({
        //     path:'childen',
        //     populate:{
        //         path:'newLists'
        //     }
        // }).lean()
        // console.log(cats)
        // res.send(cats)

        const parent = await Category.findOne({
            name: "新闻资讯"
        })
        //聚合查询：一步一步查询
        //下面是先查找属于是“新闻资讯”的分类（新闻，公告，赛事等）
        //再放一个外键newList来显示存在主键属于子分类的所有文章  （前提是关联过！）
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } }, //条件查询相当于where
            {
                $lookup: {
                    from: 'articles', //这个是数据库上的表名，默认是模型名字（Articles）的小写复数形式
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields: {
                    'newsList':{$slice:['$newsList',5]}
                }
            }
        ])
        const subCates = cats.map(v=>v._id)
        cats.unshift({
            name:'热门',
            newsList:await Article.find().where({
                categories:{$in:subCates}
            }).populate('categories').limit(5).lean()
        })
        
        cats.map(cat=>{
            cat.newsList.map(news=>{
                news.categoryName =(cat.name === '热门') ? news.categories[0].name:cat.name
                return news
            })
            return cat
        })
        res.send(cats)
    })

    router.get('/heroes/list', async (req, res) => {
        const parent = await Category.findOne({
            name: "英雄列表"
        })
        const heroes = await Category.aggregate([
            { $match: { parent: parent._id } }, 
            {
                $lookup: {
                    from: 'heros', //这个是数据库上的表名，默认是模型名字（Articles）的小写复数形式
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'heroes'
                }
            }
        ])
        res.send(heroes)
    })

    router.get('/articles/:id',async(req,res)=>{
        const one = await Article.findById(req.params.id)
        res.send(one)
    })

    router.get('/hero/:id',async(req,res)=>{
        const one = await Hero.findById(req.params.id).populate('categories')
        res.send(one)
    })
    app.use('/web/api', router)
}