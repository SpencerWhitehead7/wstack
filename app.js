const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { db, Page, User } = require('./models')

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extened: false }))

app.get('/', (req, res, next) => {
  res.send('hello world')
})

// db.authenticate().then(() => {
//   console.log('connected to the database')
// })

const init = async () => {
  await db.sync()

  const PORT = 3000

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`)
  })
}

init()
