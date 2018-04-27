const express = require('express')
const router = express.Router()
const { Page, User } = require('../models/index')
const { userList, userPages } = require('../views')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.send(userList(users))
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findAll({
      where: {
        id: id
      }
    })
    const pages = await Page.findAll({
      where: {
        authorId: id
      }
    })

    res.send(userPages(user[0], pages))
  } catch (error) {
    next(error)
  }
})

module.exports = router
