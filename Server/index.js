// require('dotenv').config()
const express = require('express')
// const cors = require('cors')
// const morgan = require('morgan')
// const cookieParser = require('cookie-parser')
// const router = require('./routes/index')
// const errorMiddleware = require('./middleware/error-middleware')
// const mongoose = require('mongoose')

const PORT = 5000
const app = express()

// app.use(express.json())
// app.use(cookieParser())
// app.use(morgan('dev'))
// app.use(
//   cors({
//     credentials: true,
//     origin: true,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   })
// )
// app.use('/api', router)
// app.use('/api/images', express.static(__dirname + '/uploads'))
// app.use(errorMiddleware)

// const start = async () => {
//   try {
//     await mongoose.connect(
//       'mongodb://127.0.0.1:27017/PainterServer',
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       },
//       () => console.log('MongoDB connected!')
//     )
//     app.listen(PORT, () => {
//       console.log(`Server has been started on port: ${PORT}`)
//     })
//   } catch (e) {
//     console.log(e)
//   }
// }

app.listen(PORT, () => {
  console.log(`Server has been started on port: ${PORT}`)
})
