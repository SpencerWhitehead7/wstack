const express = require('express')
const router = express.Router()
const addPage = require('../views/addPage')
const { Page } = require('../models/index')
const wikipage = require('../views/wikipage')

router.get('/', (req, res, next) => {
  res.send('homepage')
})

router.post('/', async (req, res, next) => {
  try {
    const newPage = await Page.create({
      title: req.body.title,
      content: req.body.content
    })
    res.redirect(`/wiki/${newPage.slug}`)
  } catch (error) {
    next(error)
  }
})

router.get('/add', (req, res, next) => {
  res.send(addPage())
})

router.get('/:slug', async (req, res, next) => {
  try {
    const slug = req.params.slug
    const currentPage = await Page.findAll({
      where: {
        slug: slug
      }
    })
    res.send(wikipage(currentPage[0]))
  } catch (error) {
    next(error)
  }
})

module.exports = router
