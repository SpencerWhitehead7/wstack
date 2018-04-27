const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { db, Page, User } = require('./models')
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')


app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extened: false }))

app.use('/wiki', wikiRouter)
app.use('/user', userRouter)

// app.get('/', (req, res, next) => {
//   res.send('hello world')
// })

app.get('/', (req, res)=>{
  res.redirect('/wiki')
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
