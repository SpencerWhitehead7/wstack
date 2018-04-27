const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extened: false }))
const morgan = require('morgan')
const { db, Page, User } = require('./models/index')
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')

app.use(morgan('dev'))

app.use(express.static(__dirname + '/public'))

app.use('/wiki', wikiRouter)
app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.redirect('/wiki')
})

const init = async () => {
  await db.sync()
  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`)
  })
}

init()
