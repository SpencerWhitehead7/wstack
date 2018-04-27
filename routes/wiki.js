const express = require('express')
const router = express.Router()
const addPage = require('../views/addPage')
const {Page} = require('../models/index')

router.get("/", (req, res, next)=>{
  res.send('homepage')
})

router.post("/", async (req, res, next)=>{
  try{
    const newPage = await Page.create({
      title: req.body.title,
      content: req.body.content,
    })
    res.redirect('/')
    console.log(newPage.dataValues)
  }catch(error){
    next(error)
  }
})

router.get("/add", (req, res, next)=>{
  res.send(addPage())
})

module.exports = router