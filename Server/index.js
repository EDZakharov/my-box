// require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const router = require('./Routes/Routes')
// const errorMiddleware = require('./middleware/error-middleware')
const mongoose = require('mongoose')

const PORT = 7000
const app = express()
const DB_URL = 'mongodb://127.0.0.1:27017/'
const DB_NAME = 'myboxdev'

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(
  cors({
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
)
app.use('/', router)

const start = async () => {
  try {
    await mongoose
      .connect(DB_URL + DB_NAME, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Mongo  -connected-')
        app.listen(PORT, () => {
          console.log(`Server -running-`)
        })
      })
  } catch (e) {
    console.log(e)
  }
}

start()
