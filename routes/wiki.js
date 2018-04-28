const express = require('express')
const router = express.Router()
const addPage = require('../views/addPage')
const { Page, User } = require('../models/index')
const wikipage = require('../views/wikipage')
const main = require('../views/main')

router.get('/', async (req, res, next) => {
  try {
    const allPages = await Page.findAll()
    res.send(main(allPages))
  } catch (error) {next(error)}
})

router.post('/', async (req, res, next) => {
  try {
    const newPage = await Page.create({
      title: req.body.title,
      content: req.body.content
    })
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    newPage.setAuthor(user)
    res.redirect(`/wiki/${newPage.slug}`)
  } catch (error) {next(error)}
})

router.get('/add', (req, res, next) => {
  res.send(addPage())
})

router.get('/:slug', async (req, res, next) => {
  try {
    const currentPage = await Page.findAll({
      where: {
        slug: req.params.slug
      }
    })
    const name = await User.findById(currentPage[0].authorId)
    res.send(wikipage(currentPage[0], name))
  } catch (error) {next(error)}
})

module.exports = router
